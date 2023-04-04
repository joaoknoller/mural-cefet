## Login

-   Utilizar middleware para verificar autenticação
-   $_SESSION['usuario'] = 'Bob'; if (isset($\_SESSION['usuario']))...
-   Colocar antes do session_start(); -> session_name('sid');
-   Criar interface de sessão e criar class SessaoEmArquivo (iniciar, destruir, definirValor($chave, $valor)...)
