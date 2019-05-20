import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogPost from '../components/BlogPost'
import SEO from '../components/SEO';

const Post = ({ data }) => {
  const post = data.allPost.edges[0].node
  
  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.title}
        // image={post.cover.url}
        image="https://oschvr.s3.us-west-2.amazonaws.com/697191910bb741cf8c74c4a3b1dd26da.jpg"
        pathname={`posts/${post.slug}`}
        article
      />
      <BlogPost post={post} />
    </Layout>
  )
}

export default Post

export const postQuery = graphql`
  query PostQuery($id: String!) {
    allPost(
      filter: {
        id: { eq: $id }
      }
    ) {
      edges {
        node {
          title,
          slug,
          cover {
            url
          },
          body,
          createdAt
          author {
            username,
            email
          }
        }
      }
    }
  }
`
