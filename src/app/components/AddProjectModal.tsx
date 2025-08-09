import React, { useState } from "react";
import styles from "./AddProjectModal.module.css";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!name.trim()) {
      setError("Proje adı boş olamaz.");
      return;
    }
    setError("");
    onAdd(name.trim());
    setName("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>Yeni Proje Ekle</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Proje adı"
          className={styles.input}
        />
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelBtn}>İptal</button>
          <button onClick={handleAdd} className={styles.addBtn}>Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
