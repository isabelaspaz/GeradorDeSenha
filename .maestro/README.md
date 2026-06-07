# Testes Maestro no Expo Web

Estes fluxos foram feitos para rodar no navegador, sem emulador Android.

1. Inicie o app web:

```bash
cd frontend
npm.cmd run web
```

2. Em outro terminal, rode os testes Maestro:

```bash
maestro test .maestro/login-web.yaml
maestro test .maestro/cadastro-web.yaml
```

Se o Expo abrir em outra porta, altere o valor de `url` nos arquivos YAML.
