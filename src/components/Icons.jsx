// Small inline icons (24px grid, stroke-based) so no icon library is needed.

function Svg({ children, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MailIcon = (p) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Svg>
);

export const PhoneIcon = (p) => (
  <Svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></Svg>
);

export const PinIcon = (p) => (
  <Svg {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></Svg>
);

export const ExternalIcon = (p) => (
  <Svg size={14} {...p}><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Svg>
);

export const DownloadIcon = (p) => (
  <Svg {...p}><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></Svg>
);

export const SheetIcon = (p) => (
  <Svg size={28} {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16M4 15h16M10 3v18" /></Svg>
);

export const MenuIcon = (p) => (
  <Svg size={24} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
);

export const CloseIcon = (p) => (
  <Svg size={24} {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);

export const ArrowIcon = (p) => (
  <Svg size={18} {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Svg>
);
