import React from 'react';
import { graphql } from 'gatsby';
import { useLocalRemarkForm } from 'gatsby-tinacms-remark';
import { Helmet } from 'react-helmet';
import { Layout } from '../components';

export default ({ data }) => {
  const formOptions = {
    label: 'About',
    fields: [
      {
        name: 'frontmatter.title',
        label: 'Title',
        component: 'text'
      },
      {
        name: 'rawMarkdownBody',
        label: 'Body',
        component: 'markdown'
      }
    ]
  };
  const site = data.site.siteMetadata;
  const [page] = useLocalRemarkForm(data.page, formOptions);

  return (
    <Layout title={page.frontmatter.title}>
      <Helmet>
        <title>
          {page.frontmatter.title} | {site.title}
        </title>
      </Helmet>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    page: markdownRemark(fileRelativePath: { eq: "/content/pages/about.md" }) {
      ...TinaRemark
      frontmatter {
        title
      }
      html
    }
  }
`;
