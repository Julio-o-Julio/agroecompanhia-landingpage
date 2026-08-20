#!/usr/bin/env python3
"""
Gera os derivados WebP das fotos de produto.

Uso:
    python3 scripts/fotos-produto.py

Varre `public/images/products/*.{jpg,jpeg,png}` e, para cada foto, escreve:

    <nome>-1152.webp   quadro em telas grandes (2x da coluna de 36rem)
    <nome>-720.webp    quadro no celular
    <nome>-200.webp    miniatura da régua embaixo do carrossel

Depois é só acrescentar `photo('<nome>', 'texto alternativo')` na lista
`images` do produto em `src/data/site.ts` — a primeira da lista é a que abre
o carrossel. Os originais podem ficar na pasta (não são baixados por quem
visita o site) ou ser apagados depois de conferir o resultado.

Requer Pillow:  pip install pillow
"""

from pathlib import Path
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit('Pillow não encontrado. Rode: pip install pillow')

RAIZ = Path(__file__).resolve().parent.parent
PASTA = RAIZ / 'public' / 'images' / 'products'
# largura -> qualidade
TAMANHOS = {1152: 80, 720: 80, 200: 76}
ORIGINAIS = ('.jpg', '.jpeg', '.png')


def main() -> int:
    fotos = sorted(f for f in PASTA.iterdir() if f.suffix.lower() in ORIGINAIS)
    if not fotos:
        print(f'Nenhuma foto original em {PASTA}')
        return 1

    total = 0
    for foto in fotos:
        img = Image.open(foto).convert('RGB')
        for largura, qualidade in TAMANHOS.items():
            destino = PASTA / f'{foto.stem}-{largura}.webp'
            alvo = img.resize(
                (largura, round(img.height * largura / img.width)), Image.LANCZOS
            )
            alvo.save(destino, 'WEBP', quality=qualidade, method=6)
            total += destino.stat().st_size
            print(f'  {destino.name:<44} {alvo.width}x{alvo.height:<6} '
                  f'{destino.stat().st_size / 1024:>6.0f} KB')

    print(f'\n{len(fotos)} foto(s) · {total / 1024:.0f} KB em derivados')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
