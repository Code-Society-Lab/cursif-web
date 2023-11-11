import { useState, useEffect } from 'react';

export function PageTitle({
  page,
  updatePage
}: {
  page: Page,
  updatePage: any
}) {
  const [title, setTitle] = useState('');
  const [isBlurred, setIsBlurred] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTitleClick = () => {
    setIsBlurred(false);
  };

  const handleTitleBlur = () => {
    updatePage({
      variables: {
        id: page.id,
        title: title,
      },
    });
    setIsBlurred(true);
  };

  useEffect(() => {
    if (page?.title) {
      setTitle(page.title);
    }
  }, [page]);

  return (
    <div className='mt-6 ml-5'>
      <div className="font-bold text-xl mb-4 ml-8 ">
        {isBlurred ? (
          <label onClick={handleTitleClick}>{title}</label>
        ) : (
          <input
            className="text-2xl font-bold outline-none bg-transparent w-full"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
          />
        )}
      </div>
    </div>
  );
}
