"""Verifica no render real que não há movimento residual nas conexões prontas."""
from pathlib import Path
from PIL import Image, ImageChops
folder=Path('out/hemobras/review-v4')
# Câmera em repouso e opacidade constante. Exclui a barra de progresso e legendas.
viewport=(0,112,1920,872)
for a,b in [(875,895),(895,915),(990,1010)]:
    first=Image.open(folder/f'{a}.png').convert('RGB').crop(viewport)
    second=Image.open(folder/f'{b}.png').convert('RGB').crop(viewport)
    difference=ImageChops.difference(first,second)
    assert difference.getbbox() is None, f'Movimento residual entre os quadros {a} e {b}: {difference.getbbox()}'
    print(f'Quadros {a} e {b}: organograma idêntico, sem setas ou pulsos repetidos.')
