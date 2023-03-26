package br.com.api.produtos.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "produtos")
public class ProdutoModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private String nome;
    private String marca;

    public Long getCodigo(){
        return codigo;
    }
    public void setCodigo(Long c){
        this.codigo = c;
    }

    public String getNome(){
        return nome;
    }
    public void setNome(String n){
        this.nome = n;
    }

    public String getMarca(){
        return marca;
    }
    public void setMarca(String m){
        this.marca = m;
    }
}
