// app/UI/Icon.tsx
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export function Icon({
  icon,
  ...props
}: { icon: IconProp } & React.ComponentProps<typeof FontAwesomeIcon>) {
  return <FontAwesomeIcon icon={icon} {...props} />;
}
