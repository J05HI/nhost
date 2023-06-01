import type { IconProps } from '@/components/ui/v2/icons';
import { SvgIcon } from '@/components/ui/v2/icons/SvgIcon';

export default function PDFPreviewIcon(props: IconProps) {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PDF file"
      {...props}
    >
      <path
        d="M13.5005 15H2.5C2.36739 15 2.24021 14.9473 2.14645 14.8536C2.05268 14.7598 2 14.6326 2 14.5V1.5C2 1.36739 2.05268 1.24021 2.14645 1.14645C2.24021 1.05268 2.36739 1 2.5 1H10.5005L14.0005 4.5V14.5C14.0005 14.5657 13.9876 14.6307 13.9624 14.6913C13.9373 14.752 13.9005 14.8071 13.854 14.8536C13.8076 14.9 13.7525 14.9368 13.6918 14.9619C13.6312 14.9871 13.5661 15 13.5005 15Z"
        fill="#F13154"
      />
      <path
        d="M10.5 1V3.5C10.5 4.05228 10.9477 4.5 11.5 4.5H14.0005"
        fill="#C91737"
      />
      <path
        d="M4.6049 8H3V11.8033H3.9139V10.6219H4.59376C5.47144 10.6219 5.93396 10.0451 5.93396 9.31792C5.93396 8.60184 5.4798 8 4.6049 8ZM5.00613 9.31792C5.00613 9.71078 4.77208 9.93369 4.39315 9.93369H3.91112V8.70215H4.39315C4.77208 8.70215 5.00613 8.91948 5.00613 9.31792Z"
        fill="white"
      />
      <path
        d="M6.56088 8V11.8033H8.05155C9.22457 11.8033 9.77069 11.0733 9.77069 9.88632C9.77069 8.71329 9.23851 8 8.05155 8H6.56088ZM7.47757 8.72444H7.90666C8.55308 8.72444 8.83171 9.12566 8.83171 9.90861C8.83171 10.6888 8.55586 11.0761 7.90666 11.0761H7.47757V8.72444Z"
        fill="white"
      />
      <path
        d="M11.384 11.8033V10.3683H12.8523V9.65506H11.384V8.73558H13V8H10.4673V11.8033H11.384Z"
        fill="white"
      />
    </SvgIcon>
  );
}