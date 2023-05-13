import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { remark } from 'remark';
import html from 'remark-html';

const postDirectory =path.join(process.cwd(),'posts')

export function getSortedPostsData(){
    //从/posts中得到文件名
    const fillNames=fs.readdirSync(postDirectory);

    const allPostsData=fillNames.map((fileName)=>{ //js箭头函数的用法
        //移除.md
        const id=fileName.replace(/\.md$/,'')

        //以字符串形式读取文件
        const fullPath=path.join(postDirectory,fileName)
        const fileContents=fs.readFileSync(fullPath,'utf-8')

        //使用gray-matter
        const matterResult=matter(fileContents);

        //把data和id混合起来
        return{
            id,
            ...matterResult.data
        };
    });

    return allPostsData.sort((a,b)=>{
        if(a.date<b.date){
            return 1
        }else{
            return -1
        }
    })

}

export function getAllPostIds(){
    const fileNames=fs.readdirSync(postDirectory)

    return fileNames.map((fileName)=>{
        return{
            //这里返回一个对象
            params:{
                id: fileName.replace(/\.md$/,''),
            }   
        }

    })
}

export async function getPostData(id){
    const fullPath=path.join(postDirectory,`${id}.md`)
    const fileContents=fs.readFileSync(fullPath,'utf8')

    const matterResult=matter(fileContents)

    //使用remark把makedown文件转换为html字符串
    const processedContent =await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml=processedContent.toString();



    return{
        id,
        contentHtml,
        ...matterResult.data
    }
}