import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
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

export default function PageEditor({ pageId }: { pageId: String }): JSX.Element {
  const [content, setContent] = useState('');

  const { data, loading, error, subscribeToMore } = useQuery(PAGE_QUERY, {
    variables: {
      id: pageId,
    },
    onCompleted: (data) => {
      setContent(data.page.content || '');
    }
  });

  subscribeToMore({
    document: PAGE_UPDATE_SUBSCRIPTION,
    variables: { id: pageId },
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
      id: pageId,
      title: data?.page.title,
    }
  });

  const onChange = (newContent) => {
    setContent(newContent);

    // updatePage({
    //   variables: {
    //     id: pageId,
    //     content: newContent,
    //   },
    // });
  }

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
