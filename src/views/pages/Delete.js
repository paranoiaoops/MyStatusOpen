let Delete = {
    render : async () => {
        let data = [];
        await getAll(db, DB_STORE_NAME).then((received)=> {
            data = received;
        });

        let view = `
            <article class="page-list box-border">
                ${ data.map( data =>
                    `<div class="list-skill-potion">${data.title}</div>`
                    + `<div class="list-edit-button"><input type="button" onclick="showDialog(${data.id});" value="Delete"> </div>`
                    ).join('\n')
                }
            </article>
            <dialog id="delete-dialog">
                <form method="dialog" class="page-dialog">
                    <div>スキルを忘れます。よろしいですか？</div>
                    <button id="exec-delete">Yes</button>
                    <button value="cancel">No</button>
                </form>
            </dialog>
        `;
        return view;
    }
    , after_render : async () => {

    }
}

export default Delete;