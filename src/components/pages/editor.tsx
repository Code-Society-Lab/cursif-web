import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useSubscription, gql } from '@apollo/client';
import { Loader } from "@/components/loader";

import dynamic from "next/dynamic";
import hljs from 'highlight.js';
import '@styles/editor.css';

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
);


const PAGE_QUERY = gql`
   query GetPage($id: ID!) {
     page(id: $id) {
       id
       title
       content
     }
   }
`;

const UPDATE_PAGE_MUTATION = gql`
   mutation UpdatePage($id: ID!, $content: String!, $title: String) {
     updatePage(id: $id, content: $content, title: $title) {
       id
       title
       content
     }
   }
`;

const PAGE_UPDATE_SUBSCRIPTION = gql`
  subscription PageUpdated($id: ID!) {
    pageUpdated(id: $id) {
      id
      title
      content
    }
  }
`;

function updatedPage() {
  const { data, loading } = useSubscription(PAGE_UPDATE_SUBSCRIPTION, {
    variables: {
      id: "e91a2b62-4a22-438c-ab99-a201604fe66c"
    }
  });

  console.log(updatedPageData);
  return data.pageUpdated.content;
}

export default function PageEditor({ page_id }: { page_id: String }): JSX.Element {
  const [content, setContent] = useState('');

  const { data, loading, error, subscribeToMore } = useQuery(PAGE_QUERY, {
    variables: {
      id: page_id,
    },
    onCompleted: (data) => {
      setContent(data.page.content || '');
    }
  });

  subscribeToMore({
    document: PAGE_UPDATE_SUBSCRIPTION,
    variables: { id: page_id },
    updateQuery: (prev, { subscriptionData }) => {
      setContent(subscriptionData.data.pageUpdated.content);

      return Object.assign({}, prev, {
        page: {
          id: subscriptionData.data.pageUpdated.id,
          title: subscriptionData.data.pageUpdated.title,
          content: subscriptionData.data.pageUpdated.content,
          __typename: prev.page.__typename
        }
      });
    },
  });

  const [updatePage] = useMutation(UPDATE_PAGE_MUTATION, {
    variables: {
      id: page_id,
      title: data?.page.title,
    }
  });

  const onChange = useCallback(setContent, []);

  function save() {
    updatePage({
      variables: {
        id: page_id,
        content: content,
      },
    });
  }

  useEffect(() => {
    const timeout = setTimeout(save, 1000);
    return () => clearTimeout(timeout);
  }, [content]);

  const options = useMemo(() => {
      return {
        autofocus: true,
        spellChecker: true,
        status: false,
        previewImagesInEditor: true,
        toolbar: [
          "bold", "italic", "heading", "|",
          "quote", "unordered-list", "ordered-list", "|",
          "link", "image", "|",
          "preview", "side-by-side", "fullscreen", "|",
          "guide"
        ],
        renderingConfig: {
          codeSyntaxHighlighting: true,
          hljs: hljs,
        },
      } as EasyMDE.Options;
    }, []);

  if (loading)
    return <Loader />;

  return (
    <SimpleMDE
      className='editor'
      value={content}
      onChange={onChange}
      placeholder='Write your thoughts...'
      options={options}
    />
  );
}
