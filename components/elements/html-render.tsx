"use client";

import { useState } from "react";

interface HtmlRenderProps {
  html: string | null | undefined;
  className?: string;
  isExtend?: boolean;
}

const HtmlRender: React.FC<HtmlRenderProps> = ({
  html,
  className,
  isExtend = false,
}) => {
  const [expanded, setExpanded] = useState(isExtend);

  if (!html) return null;

  return (
    <div>
      <div
        className={`${className} ${!expanded ? "line-clamp-4" : ""
          }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-green-600 cursor-pointer font-medium hover:underline"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default HtmlRender;