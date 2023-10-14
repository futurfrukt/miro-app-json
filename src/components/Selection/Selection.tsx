import * as React from "react";
import {useEffect, useState, useMemo, useCallback, useRef} from "react";
import {Item, SelectionUpdateEvent} from "@mirohq/websdk-types";

import {downloadJson} from "../../utils/downloadJson";
import styles from "./Selection.module.css";
import classnames from "classnames";

export const Selection = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    miro.board.getSelection().then((selectedItems) => setItems(selectedItems));
  }, []);

  useEffect(() => {
    const selectionUpdateHandler = ({items: selectedItems}: SelectionUpdateEvent) => {
      if (selectedItems?.length) {
        setItems(selectedItems);
      }
    }
    miro.board.ui.on("selection:update", selectionUpdateHandler);

    return () => {
      miro.board.ui.off("selection:update", selectionUpdateHandler);
    }
  }, [setItems]);

  const handleClickDownload = useCallback(() => {
    downloadJson(items);
  }, [items]);

  const jsonString = useMemo(() => {
    return JSON.stringify(items, null, 2);
  }, [items]);

  const ref = useRef<HTMLTextAreaElement>(null);

  return <div className={classnames("cs1", "ce12", styles.selection)}>
    {
      Boolean(Object.keys(items).length)
        ? <button className={styles.button} onClick={handleClickDownload}>Download JSON</button>
        : <div>Select cards on the board to get JSON</div>
    }
    <textarea
      className={styles.text}
      ref={ref}
      readOnly
      value={jsonString}
      onClick={() => ref.current?.select()}
    />
  </div>
};