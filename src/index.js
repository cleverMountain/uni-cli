const { resolve } = require("path")
const fs = require('fs');

module.exports = function run(template, project) {
  const tempaltePath = resolve(__dirname, `../template/${template}`),
    targetPath = process.cwd() + "\\" + project

  if (!fs.existsSync(tempaltePath)) return
  createTemplate(tempaltePath, targetPath, project)
}

function createTemplate(tempaltePath, targetPath, project) {
  // 创建文件夹
  fs.mkdirSync(targetPath)
  const files = fs.readdirSync(tempaltePath)
  files.forEach(file => {
    // 复制的原地址
    const originPath = tempaltePath + "\\" + file,
      // 目的地址 
      destPath = targetPath + "\\" + file,
      stats = fs.statSync(originPath)
    // 文件直接复制
    if (stats.isFile()) {
      fs.copyFileSync(originPath, destPath)
      if (file === 'package.json') {
        modifyContent(destPath, project)
      }
    } else {
      // 文件夹递归复制,目的地址需要再加上
      // const _targetPath = targetPath + "\\" + file
      createTemplate(originPath, destPath, project)
    }
  })

}

// 修改package.json
function modifyContent(destPath, project) {
  // 读取
  let content = fs.readFileSync(destPath, 'utf8')
  // 修改
  content = JSON.parse(content)
  content.name = project
  // 重新写入
  fs.writeFileSync(destPath, JSON.stringify(content, null, 2), 'utf8')
  console.log('项目创建完毕')
}