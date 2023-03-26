package br.com.api.produtos.modelo;

import org.springframework.stereotype.Component;

@Component
public class RespostaModelo {
    
    private String mensagem;

    public String getMensagem(){
        return mensagem;
    }
    public void setMensagem(String m){
        this.mensagem = m;
    }
}
