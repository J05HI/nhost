import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { LoadingScreen } from '@/components/presentational/LoadingScreen';
import { RetryableErrorBoundary } from '@/components/presentational/RetryableErrorBoundary';
import { useCurrentWorkspaceAndProject } from '@/features/projects/common/hooks/useCurrentWorkspaceAndProject';
import { generateAppServiceUrl } from '@/features/projects/common/utils/generateAppServiceUrl';
import { FilesDataGrid } from '@/features/storage/dataGrid/components/FilesDataGrid';
import { getHasuraAdminSecret } from '@/utils/env';
import { getHasuraAdminSecretFromLocalStorage } from '@/utils/helpers';
import { NhostApolloProvider } from '@nhost/react-apollo';
import type { ReactElement } from 'react';

export default function StoragePage() {
  const { currentProject, loading } = useCurrentWorkspaceAndProject();

  if (!currentProject || loading) {
    return <LoadingScreen />;
  }

  return (
    <NhostApolloProvider
      graphqlUrl={generateAppServiceUrl(
        currentProject.subdomain,
        currentProject.region,
        'graphql',
      )}
      fetchPolicy="cache-first"
      headers={{
        'x-hasura-admin-secret':
          process.env.NEXT_PUBLIC_ENV === 'dev'
            ? getHasuraAdminSecret()
            : getHasuraAdminSecretFromLocalStorage(),
      }}
    >
      <div className="h-full pb-25 xs+:pb-[53px]">
        <RetryableErrorBoundary>
          <FilesDataGrid />
        </RetryableErrorBoundary>
      </div>
    </NhostApolloProvider>
  );
}

StoragePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ProjectLayout
      mainContainerProps={{ sx: { backgroundColor: 'background.default' } }}
    >
      {page}
    </ProjectLayout>
  );
};
