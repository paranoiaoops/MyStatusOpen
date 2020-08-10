let List = {
    render : async () => {
        let data = [];
        await getAll(globalThis.db, DB_STORE_NAME).then((received)=> {
            data = received;
        });

        let view =  /*html*/`
        <article class="page-list box-border">
            ${ data.map( data =>
                `<div class="list-skill-potion">${data.title}</div>`
                + `<div class="list-edit-button"><input type="button" onclick="location.hash = '#/edit/${data.id}'" value="Edit"> </div>`
            )
            .join('\n')
        }
        </article>
        `
        return view
    }
    , after_render : async () => {

    }
}

export default List;