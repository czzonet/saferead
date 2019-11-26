typescript脚手架
=

中文文档 | [English](README-en.md)

搭建node+ts环境，用VS code调试。

**原理：** 一些繁重的如gitignore，tsconfig，文件结构等配置。

**我的一些感想：** 难以置信，竟然需要这么多步骤，如何建立自己的脚手架？目前暂时用手动梳理步骤，使用拷贝即可。

TODO List
--

- [ ] npm脚本命令行自动生成（类似vue-cli这种） 
- [ ] task编译前先清理先前编译的dist文件夹，防止污染

使用
--

1. 新项目clone本仓库。
   ```sh
   git clone git@github.com:czzonet/typescript-scaffold.git
   ```

2. 重建git
   ```sh 
   rm -r ./git 
   git init
   git remote add origin [your repository]
   ```

3. 修改包信息，把package.json里的项目名和作者改为自己的。（可选）
4. 安装依赖`yarn`
5. 点击VS code调试或者`npm run dev`即可运行  
   *注意：`terminal`编译后会自动关闭并且跳转到`debug console`，如果未跳转可以手动切换*

从头构建指南
--

介绍起手架搭建的细节，可以参考自己去构建。 :white_check_mark:

1. README.md
   ```
   touch README.md
   ```
2. git
   ```
   git init
   touch .gitignore
   ```
3. tsc
   ```sh
   mkdir src
   touch tsconfig.json
   ```
4. yarn
   ```
   yarn init
   ```

.gitignore文件内容
--
排除生成的dist，npm模块，和yarn的锁定文件。注意不需要的文件要及时排除，一旦提交就会永久存在文件记录里，特别对于大型文件，极难排除。

``` 
dist
node_modules
yarn.lock
```

tsconfig.json 文件内容
--

一些编译选项，没有太多特别。不要过多，自己定义，自己用的舒适。

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "alwaysStrict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "lib": [
      "es2015",
      "es2016"
    ],
    "typeRoots": [
      "./node_modules/@types"
    ]
  },
  "include": [
    "./src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

vs code 调试
--

先`Terminal->Configure Tasks`添加ts的build任务，再`Debug->Add Configuration`添加node的调试配置，基本是全部默认生成的，只有少部分需要手动指定。

tasks.json 文件内容
--

由于windows下解析路径`\\`的问题，所以要指定`power shell`来运行，最后如下：

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558 
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "problemMatcher": [
        "$tsc"
      ],
      "options": {
        "shell": {
          "executable": "powershell.exe"
        }
      }
    }
  ]
}
```

launch.json 内容
--

手动指定可执行文件位置就可以了，最后如下：

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}\\dist\\index.js",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": [
        "${workspaceFolder}/dist/**/*.js"
      ]
    }
  ]
}
```
