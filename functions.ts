class FreeHtmlParser{
    _content:string;
    constructor(_content:string = ""){
        this._content = _content;
    }
    parse(_compress:boolean = false):string{
        const minify = require('html-minifier').minify;
        let _style:string = "";
        let _result:string = "";
        let _temp:RegExpMatchArray | null;
        _temp = this._content.match(/(?<=(<bgcol>)).*?(?=(<\/bgcol>))/gi);
        if(_temp){
            _style += `body{background-color:${_temp[_temp.length - 1]}}`;
        }
        _result = this._content
            .replace(/(<html5>)|(<!html>)/gi, `<!DOCTYPE html>`)
            .replace(/(<html4>)/gi, `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`)
            .replace(/(<hcode>)/gi, `<meta charset="`)
            .replace(/(<icon>)/gi, `<link rel="icon" type="image/x-icon" href="`)
            .replace(/(<info>)/gi, `<meta name="description" content="`)
            .replace(/(<key>)/gi, `<meta name="keywords" content="`)
            .replace(/(<\/info>)|(<\/icon>)|(<\/hcode>)|(<\/key>)/gi, `">`)
            .replace(/(<center>)/gi, `<div style="text-align:center">`)
            .replace(/(<\/center>)/gi, `</div>`)
            .replace(/\s*(<bgcol>|<bgimg>).*?(<\/bgcol>|<\/bgimg>)/gi, '');
        if(_style){
            _result += `\n<style>${_style}</style>`
        }
        if(_compress == true){
            _result = minify(_result,{removeComments: true,collapseWhitespace: true,minifyJS: true,minifyCSS: true});
        }
        return _result;
    };
}
export { FreeHtmlParser };