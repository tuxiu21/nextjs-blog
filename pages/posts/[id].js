import Layout from "../../components/layout";
import { getPostData,getAllPostIds } from "../../lib/posts";

import Head from "next/head";
import Date from "../../components/date";

import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}){
    console.log("main post");
    return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingX1}>{postData.title}</h1>
            
            <div className={utilStyles.lightText}><Date dateString={postData.date}></Date></div>
            <br/>
            <div dangerouslySetInnerHTML={{__html:postData.contentHtml}}>
            </div>
        </article>
    </Layout>
    )
}

export async function getStaticPaths(){
    //这里应该是获取路由路径
    const paths=getAllPostIds()
    console.log("静态path"+Object.keys(paths));
    
    return{
        paths,
        fallback:false
    }
}

export async function getStaticProps({params}){
    console.log("静态参数："+Object.keys(params))
    const postData= await getPostData(params.id)
    return{
        props:
        {
            postData
        }
    }
}