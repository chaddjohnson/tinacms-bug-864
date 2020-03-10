import React from 'react';
import path from 'path';
import { graphql } from 'gatsby';
import { useLocalRemarkForm } from 'gatsby-tinacms-remark';
import { get } from 'lodash';
import { Helmet } from 'react-helmet';
import { Layout } from '../components';

export default ({ data }) => {
  const formOptions = {
    label: 'Wholesale',
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
      },
      {
        name: 'frontmatter.products',
        label: 'Products',
        component: 'group-list',
        itemProps: item => ({
          key: item.id,
          label: item.name
        }),
        defaultItem: () => ({
          name: 'New Product',
          price: 0,
          description: 'Description',
          images: [{ url: '../images/placeholder.jpg' }]
        }),
        fields: [
          {
            name: 'name',
            label: 'Name',
            component: 'text'
          },
          {
            name: 'price',
            label: 'Price',
            component: 'number',
            parse: value => {
              return parseFloat(value) || 0;
            }
          },
          {
            name: 'description',
            label: 'Description',
            component: 'text'
          },
          {
            name: 'images',
            label: 'Images',
            component: 'group-list',
            itemProps: ({ url }) => ({ label: url ? path.basename(url) : 'New Image' }),
            fields: [
              {
                name: 'url',
                label: 'Image',
                component: 'image',
                parse: filename => `../images/${filename}`,
                uploadDir: () => '/content/images/',
                previewSrc: (formValues, { input }) => {
                  const nodePath = input.name.replace('rawFrontmatter', 'frontmatter');
                  const node = get(formValues, nodePath);

                  return node ? node.childImageSharp.fluid.src : '';
                }
              }
            ]
          }
        ]
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
      <pre>{JSON.stringify(page.frontmatter.products, null, 2)}</pre>
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
    page: markdownRemark(fileRelativePath: { eq: "/content/pages/wholesale.md" }) {
      ...TinaRemark
      frontmatter {
        title
        products {
          name
          price
          description
          images {
            url {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
      html
    }
  }
`;
