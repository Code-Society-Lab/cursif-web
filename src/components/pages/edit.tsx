import React, { useState } from 'react';

export default function EditTitle({
  initialTitle,
  onUpdate
}: {
  initialTitle: string,
  onUpdate: (title: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const editTitle = () => {
    setIsEditing(false);
    onUpdate(title);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
  };

  return (
    <div onDoubleClick={() => setIsEditing(true)}>
      {isEditing ? (
        <input
          className='border-0 bg-transparent focus:outline-none font-bold'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={editTitle}
          onKeyDown={onEnter}
          autoFocus
        />
      ) : (
        initialTitle
      )}
    </div>
  );
}