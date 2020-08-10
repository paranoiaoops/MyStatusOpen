let Register = {
    render : async () => {
        let view = `
            <article>
                <form id="registerForm" class="page-form box-border">
                    <div>スキル名</div>
                    <div><input type="text" id="title" autocomplete="off" required></div>
                    <div>スキルの説明</div>
                    <div><input type="text" id="subject" autocomplete="off"></div>
                    <div>レベルアップに必要な経験値</div>
                    <div><input type="number" id="require_exp_point" required value="1" min="1"></div>
                    <div class="button-grid"><input type="submit" value="スキルを習得"></div>
                </form>
            </article>
            <dialog id="information-dialog">
                <form method="dialog" class="page-dialog">
                    <div id="information"></div>
                    <button id="dialog-close">Close</button>
                </form>       
            </dialog>
        `
        return view;
    }
    , after_render : async () => {
        document.forms['registerForm'].addEventListener('submit', function() {
            if (document.forms['registerForm'].reportValidity()) {
                let registerData = {
                    title : document.getElementById("title").value,
                    subject : document.getElementById("subject").value,
                    require_exp_point : Number(document.getElementById("require_exp_point").value),
                    exp : 0
                }

                putData(db, DB_STORE_NAME, registerData).then(() => {
                    document.getElementById("information").innerText = `スキル"${registerData.title}"を習得しました。`;
                    document.getElementById("information-dialog").showModal();
                    document.getElementById("dialog-close").addEventListener('click', () => {
                        dispatchHashchange();
                    });
                });
            }
        }, false);
    }
}

export default Register;