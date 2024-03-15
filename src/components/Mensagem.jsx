export default function Mensagem({ informacoes, estilizacao }) {

    const usuario = localStorage.getItem('usuario')

    return (
        <>
            <div className="p-2  rounded w-50"
                style={{
                    backgroundColor: [estilizacao.background],
                    color: [estilizacao.color],
                }}
            >
                <header>
                    {informacoes.autor != usuario ? <span> <b>{informacoes.autor}</b> </span> : <></>}
                </header>
                <main className="text-break">
                    {informacoes.texto}
                </main>

            </div>
        </>
    );
}