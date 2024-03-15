import ScrollableFeed from "react-scrollable-feed";
import Mensagem from "../components/Mensagem";
import './chat.css';
import { useState } from "react";

export default function Chat() {

    const usuario = localStorage.getItem('usuario')

    const [mensagens, setMensagens] = useState([]);

    const [mensagem, setMensagem] = useState('');

    function EnviarMensagem() {

        const novaMensagem = {
            autor: usuario,
            texto: mensagem
        }

        setMensagem('');

        setMensagens((prevMessages) => [...prevMessages, novaMensagem])
    }

    return (
        <>
            <main className="d-flex w-100 flex-column">
                <section style={{
                    flex: 1,
                    maxHeight: '93vh',
                }}>
                    <ScrollableFeed>
                        <div className="d-flex flex-column gap-1 p-2">
                            {
                                mensagens.map((mensagem, idx) => (
                                    usuario == mensagem.autor ?
                                        <div className="d-flex justify-content-end" key={idx}>
                                            <Mensagem informacoes={mensagem} estilizacao={{ background: '#005c4b', color: 'white' }} />
                                        </div>
                                        :
                                        <div className="d-flex justify-content-start" key={idx}>
                                            <Mensagem informacoes={mensagem} estilizacao={{ background: '#202c33', color: 'white' }} />
                                        </div>
                                ))
                            }
                        </div>
                    </ScrollableFeed>
                </section>
                <footer className="d-flex p-2 gap-1"
                    style={{
                        backgroundColor: '#202c33',
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}>

                    <input
                        id="campo"
                        className="w-100 form-control"
                        placeholder="Digite uma mensagem"
                        value={mensagem}
                        onChange={e => setMensagem(e.target.value)} />

                    <button id="bt" onClick={() => EnviarMensagem()}>
                        Enviar
                    </button>
                </footer>
            </main >
        </>
    );
}