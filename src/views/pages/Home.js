function calculateNextExp(requireExpPoint, exp) {
    if (exp == 0) return requireExpPoint;
    if (exp % requireExpPoint == 0) return requireExpPoint;
    return (requireExpPoint - (exp % requireExpPoint));
}

function calculateLv (requireExpPoint, exp) {
    if (requireExpPoint > exp) return 0;
    return Math.floor(exp / requireExpPoint);
}


let Home = {
    render : async () => {

        let data = [];
        await getAll(db, DB_STORE_NAME).then((received)=> {
            data = received;
        });

        let view =  /*html*/`
        <article class="page-home box-border">
            <div class="skill-name">Skill</div>
            <div class="number-column">Lv</div>
            <div class="number-column">Next Lv</div>
            <div class="exp-column">Get Exp</div>
            ${ data.map( data =>
                    `<div class="skill-name">${data.title}</div>`
                    + `<div class="number-column">${ calculateLv(data.require_exp_point, data.exp) }</div>`
                    + `<div class="number-column">${ calculateNextExp(data.require_exp_point , data.exp)}</div>`
                    + `<div class="exp-column"><input type="button" onclick="addExp(${data.id});" value="Exp"></button> </div>`
                )
            .join('\n')
            }
        </article>
        <dialog id="information-dialog">
            <form method="dialog" class="page-dialog">
                <div id="information"></div>
                <button id="dialog-close" onclick="dispatchHashchange();">Close</button>
            </form>       
        </dialog>
        `
        return view
    }
    , after_render: async () => {
    }

}

export default Home;