"""Audita o MP4 exportado, incluindo decodificação integral e ausência de áudio."""
import json
import subprocess
from pathlib import Path
p=Path('out/hemobras/01-abertura-revisao.mp4')
probe=subprocess.run(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(p)],check=True,capture_output=True,text=True)
data=json.loads(probe.stdout)
video=[s for s in data['streams'] if s['codec_type']=='video']
assert len(video)==1, 'Número inesperado de streams de vídeo'
v=video[0]
assert v['codec_name']=='h264'
assert (v['width'],v['height'])==(1920,1080)
assert v['r_frame_rate']==v['avg_frame_rate']=='30/1'
assert v['pix_fmt']=='yuv420p'
assert v['color_range']=='tv'
assert v['color_space']=='bt709'
assert int(v['nb_read_frames'])==2100
assert abs(float(data['format']['duration'])-70)<0.001
assert not any(s['codec_type']=='audio' for s in data['streams'])
subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(p),'-f','null','-'],check=True)
report={'arquivo':str(p),'codec':'h264','formato_pixel':'yuv420p','faixa':'tv','espaco_cor':'bt709','resolucao':[1920,1080],'fps':30,'quadros_decodificados':2100,'duracao_segundos':70,'audio':False,'decodificacao_integral':'aprovada','status_editorial':'Piloto v4: conexões sem repetição após a chegada; aprovação editorial pendente'}
Path('out/hemobras/validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
