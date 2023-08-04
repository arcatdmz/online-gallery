import { FC, useCallback, useState } from "react";
import { Button, ButtonProps, Icon, List, Modal } from "semantic-ui-react";

import styles from "./CSVExportButton.module.css";
import { DirectoryListItem } from "./DirectoryListItem";

interface CSVExportButtonProps extends ButtonProps {
  dirPath: string;
}

export const CSVExportButton: FC<CSVExportButtonProps> = ({
  dirPath,
  ...props
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClick = useCallback(() => {
    setModalOpen(true);
  }, []);
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);
  return (
    <>
      <Button
        icon="download"
        content="CSV書き出し"
        {...props}
        onClick={handleClick}
      />
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Modal.Content>
          <List>
            <DirectoryListItem dirPath={dirPath} />
          </List>
        </Modal.Content>
      </Modal>
    </>
  );
};
