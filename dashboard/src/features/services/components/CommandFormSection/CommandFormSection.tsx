import { Box } from '@/components/ui/v2/Box';
import { Button } from '@/components/ui/v2/Button';
import { InfoIcon } from '@/components/ui/v2/icons/InfoIcon';
import { PlusIcon } from '@/components/ui/v2/icons/PlusIcon';
import { TrashIcon } from '@/components/ui/v2/icons/TrashIcon';
import { Input } from '@/components/ui/v2/Input';
import { Text } from '@/components/ui/v2/Text';
import { Tooltip } from '@/components/ui/v2/Tooltip';
import type { CreateServiceFormValues } from '@/features/services/components/CreateServiceForm';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function CommandFormSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CreateServiceFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'command',
  });

  return (
    <Box className="space-y-4 rounded border-1 p-4">
      <Box className="flex flex-row items-center justify-between ">
        <Box className="flex flex-row items-center space-x-2">
          <Text variant="h4" className="font-semibold">
            Command
          </Text>
          <Tooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s">
            <InfoIcon aria-label="Info" className="h-4 w-4" color="primary" />
          </Tooltip>
        </Box>
        <Button variant="borderless" onClick={() => append({ command: '' })}>
          <PlusIcon className="h-5 w-5" />
        </Button>
      </Box>

      <Box className="flex flex-col space-y-4">
        {fields.map((field, index) => (
          <Box key={field.id} className="flex w-full flex-row space-x-2">
            <Input
              {...register(`command.${index}.command`)}
              id={`${field.id}`}
              className="w-full"
              hideEmptyHelperText
              error={!!errors?.command?.at(index)}
              helperText={errors?.command?.at(index)?.message}
              fullWidth
              autoComplete="off"
            />

            <Button
              variant="borderless"
              className=""
              color="error"
              onClick={() => remove(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
