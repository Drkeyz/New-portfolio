import type { MDXComponents } from "mdx/types";
import {
  Annotated,
  BinDiagram,
  Callout,
  Columns,
  Crop,
  DesignSystem,
  Detail,
  Figure,
  Findings,
  Glance,
  Layers,
  Lead,
  Metrics,
  Pair,
  Placeholder,
  Row,
  Screens,
  Section,
  Stages,
  Stat,
  StatRow,
  Statement,
  Steps,
  Sub,
  Swatches,
  Table,
  Verify,
} from "@/components/case/blocks";
import { BrowserTabs } from "@/components/case/BrowserTabs";
import { Colourways } from "@/components/case/Colourways";
import { Browser, Phone, PhoneNotes } from "@/components/case/Phone";
import { PhoneLineup } from "@/components/case/PhoneLineup";
import { ScreenTabs } from "@/components/case/ScreenTabs";
import { ScrollPan } from "@/components/case/ScrollPan";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { Media } from "@/components/Media";

/** Everything here can be used in content/work/*.mdx without importing it. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Running text rises in like everything else.
    p: (props) => <p data-reveal {...props} />,
    Section,
    Lead,
    Sub,
    Statement,
    Stat,
    StatRow,
    Findings,
    Glance,
    Columns,
    Steps,
    Layers,
    Figure,
    Annotated,
    Detail,
    Pair,
    Row,
    Crop,
    ScrollPan,
    ScreenTabs,
    Phone,
    PhoneNotes,
    PhoneLineup,
    Colourways,
    Browser,
    BrowserTabs,
    Screens,
    BinDiagram,
    Stages,
    DesignSystem,
    Swatches,
    Callout,
    Metrics,
    Table,
    Placeholder,
    Verify,
    ComparisonSlider,
    Media,
  };
}
