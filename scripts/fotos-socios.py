#!/usr/bin/env python3
"""
Gera os derivados WebP das fotos dos sócios.

Uso:
    python3 scripts/fotos-socios.py

Varre `public/images/socios/*.{jpg,jpeg,png}` e, para cada foto, recorta o
quadro em 3:2 (proporção do card na seção "Quem somos") e escreve:

    <nome>-1200.webp   quadro em telas grandes (2x da coluna)
    <nome>-720.webp    quadro no celular

O corte é ancorado no alto (ANCORA), não no centro: como são retratos em pé,
cortar pelo meio decepa a cabeça. Ajuste ANCORA entre 0 (encosta no topo) e
1 (encosta na base) se alguma foto pedir.

Depois é só apontar `photo` do sócio em `src/data/site.ts` para o derivado.
Os originais podem ficar na pasta (não são baixados por quem visita o site).

Requer Pillow:  pip install pillow
"""

from pathlib import Path
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit('Pillow não encontrado. Rode: pip install pillow')

RAIZ = Path(__file__).resolve().parent.parent
PASTA = RAIZ / 'public' / 'images' / 'socios'
# largura -> qualidade (qualidade alta: é o rosto do dono na página)
TAMANHOS = {1200: 88, 720: 86}
PROPORCAO = 3 / 2
ANCORA = 0.0
ORIGINAIS = ('.jpg', '.jpeg', '.png')


def corta(img: Image.Image) -> Image.Image:
    """Recorta em PROPORCAO, ancorando o quadro pelo alto da foto."""
    if img.width / img.height > PROPORCAO:  # larga demais: tira das laterais
        largura = round(img.height * PROPORCAO)
        sobra = (img.width - largura) // 2
        return img.crop((sobra, 0, sobra + largura, img.height))
    altura = round(img.width / PROPORCAO)   # alta demais: tira de cima e baixo
    topo = round((img.height - altura) * ANCORA)
    return img.crop((0, topo, img.width, topo + altura))


def main() -> int:
    fotos = sorted(f for f in PASTA.iterdir() if f.suffix.lower() in ORIGINAIS)
    if not fotos:
        print(f'Nenhuma foto original em {PASTA}')
        return 1

    total = 0
    for foto in fotos:
        img = corta(Image.open(foto).convert('RGB'))
        for largura, qualidade in TAMANHOS.items():
            destino = PASTA / f'{foto.stem}-{largura}.webp'
            alvo = img.resize(
                (largura, round(img.height * largura / img.width)), Image.LANCZOS
            )
            alvo.save(destino, 'WEBP', quality=qualidade, method=6)
            total += destino.stat().st_size
            print(f'  {destino.name:<28} {alvo.width}x{alvo.height:<6} '
                  f'{destino.stat().st_size / 1024:>6.0f} KB')

    print(f'\n{len(fotos)} foto(s) · {total / 1024:.0f} KB em derivados')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
