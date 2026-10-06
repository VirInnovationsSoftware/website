import { useEffect } from "react";

const DEFAULT_TITLE = "Militros - Defence & Technology Solutions";

// Browser-tab title for the current page; server.js sets the same titles for link previews.
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;
    return () => { document.title = DEFAULT_TITLE; };
  }, [title]);
}
