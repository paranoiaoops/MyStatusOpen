let Menu  = {
    render : async () => {

        let view =  /*html*/`
        <article class="page-menu box-border">
            <div><a href="#/">スキル一覧を表示</a></div>
            <div><a href="#/register">スキルの習得</a></div>
            <div><a href="#/list" >スキルの編集</a></div>
            <div><a href="#/delete">スキルを忘れる</a></div>
        </article>
        `
        return view
    }
    , after_render: async () => {
    }

}

export default Menu;