module.exports = {
    //一行最多 100 字符,超出换行
    printWidth: 100,
    //tab的宽度，4个空格
    tabWidth: 4,
    //不使用tab缩进，使用空格
    useTabs: false,
    //行尾加上分号
    semi: true,
    //使用单引号
    singleQuote: true,
    // 对象的key仅在必要时使用引号
    quoteProps: 'as-needed', //要求字面量属性是否使用引号包裹（as-needed：没有特殊要求，禁止使用；consistent：保持一致；preserve：无限制）
    //确保对象的最后一个属性后不需要逗号
    trailingComma: 'none',
    //大括号前后空格
    bracketSpacing: true,
    //箭头函数，单个参数添加括号
    arrowParens: 'always',
    //每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    //不需要写文件开头的 @prettier
    requirePragma: false,
    //不需要自动在文件开头插入 @prettier
    insertPragma: false,
    //使用默认的折行标准
    proseWrap: 'preserve',
    //根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用自动
    endOfLine: 'auto', //结尾\n \r \n\r auto
    //jsx语法中使用单引号
    jsxSingleQuote: true,
    //jsx标签的反尖括号需要换行
    jsxBracketSameLine: false
};
