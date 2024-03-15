export default function Mensagem({ informacoes, estilizacao }) {
    return (
        <>
            <div className="p-2  rounded w-25"
                style={{
                    backgroundColor: [estilizacao.background],
                    color: [estilizacao.color],
                }}
            >

                <header>
                    <span>
                        <b>{informacoes.autor}</b>
                    </span>
                </header>
                <main className="text-break">
                    {informacoes.texto}
                </main>

            </div>
        </>
    );
}