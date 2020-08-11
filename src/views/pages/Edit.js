import Utils from "../../services/Utils.js";

let Edit = {
    render : async () => {
        let request = Utils.parseRequestURL();

        let data = {};
        await getByKey(globalThis.db, globalThis.DB_STORE_NAME, Number(request.id)).then((received)=> {
            data = received;
        });

        let view = `
            <article>
                <form id="registerForm" class="page-form box-border">
                    <div>スキル名</div>
                    <div><input type="text" id="title" required value="${data.title}"></div>
                    <div>スキルの説明</div>
                    <div><input type="text" id="subject" value="${data.subject}"></div>
                    <div>レベルアップに必要な経験値</div>
                    <div><input type="number" id="require_exp_point" required value="${data.require_exp_point}" min="1"></div>
                    <div>現在の経験値</div>
                    <div><input type="number" id="exp" required value="${data.exp}" min="0"></div>
                    <div class="edit-button-grid"><input type="submit" value="スキルを編集"></div>
                </form>
            </article>
            <dialog id="information-dialog">
                <form method="dialog" class="page-dialog">
                    <div id="information"></div>
                    <button id="dialog-close">Close</button>
                </form>       
            </dialog>
        `;

        return view;
    }
    ,after_render : async () => {
        document.forms['registerForm'].addEventListener('submit', function() {
            if (document.forms['registerForm'].reportValidity()) {
                let request = Utils.parseRequestURL();
                let registerData = {
                    id : Number(request.id),
                    title : document.getElementById("title").value,
                    subject : document.getElementById("subject").value,
                    require_exp_point : Number(document.getElementById("require_exp_point").value),
                    exp : Number(document.getElementById("exp").value)
                }

                putData(globalThis.db, globalThis.DB_STORE_NAME, registerData).then(() => {
                    let dialog = document.querySelector("dialog");
                    dialogPolyfill.registerDialog(dialog);
                    document.getElementById("information").innerText = `スキル"${registerData.title}"の編集が完了しました。`;
                    dialog.showModal();
                });
            }
        }, false);
    }
}

export default Edit;