-- Import products from CSV
-- Run this in Supabase SQL Editor

-- Insert laboratorios
INSERT INTO public.laboratorios (nombre) VALUES ('Konig') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Boehringer Ingelheim') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Zoovet') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Richmond') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Leon Pharma') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Over') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Zoetis') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Biogenesis Bago') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('MSD') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Tecnovax') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Von Franken') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Bayer') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Ale Bet') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Chinfield') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Rosenbusch') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Hampton') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Weizur') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Rio de Janeiro') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Burnet') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Syntex') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Providean') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Biotay') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Agroquímicos') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('CDV') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Brouwer') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Allflex') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Agropharma') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.laboratorios (nombre) VALUES ('Atanor') ON CONFLICT (nombre) DO NOTHING;

INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dardox Konig 5lt.',
  480862,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6a7d4ff81e2e468f81373e81e89c20b9~mv2.png',
  'Dardox es un antiparasitario externo de aplicación tópica, formulado a base de la combinación de flumetrina y eprinomectina. Está autorizado para el control estratégico de garrapatas, sarna y piojos chupadores y masticadores. Dardox es el primer pour on sarnicida, garrapaticida y piojicida del mercado. Posee 7 características como producto para el control de parásitos externos: su efecto garrapaticida, sarnicida, piojicida, su bajo tiempo de retiro de 5 días en carne y 24 hs en leche, y su alta biodisponibilidad lo convierten en un producto de primera elección. - Para: Bovinos.',
  '5lt.',
  'Cada 100 mL contiene:',
  '',
  ARRAY['bovino'],
  'https://www.koniglab.com/en/producto/dardox/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pomada Curabichera Bactrovet Plata Konig 1,2kg.',
  46430,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_80d24fdf84a94958a3d4bc9e26cafa2d~mv2.png',
  'Antimiásico, repelente, bactericida, antifúngico, cicatrizante, epitelizador y hemostático - Tratamiento de todo tipo de heridas en todas las especies - Tratamiento y prevención de bicheras en intervenciones quirúrgicas como castración, y heridas de cualquier origen - Heridas en general. - Para: Bovinos y Equinos.',
  '1,2kg.',
  'Cada 100 gramos contiene:',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.koniglab.com/producto/bactrovet-plata-pasta/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bovikalc Boehringer Ingelheim x 24 Bolos',
  281051.75,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_3e40ada2544b4f5e8929fb9dccaea570~mv2.png',
  'Aporte de calcio por via oral. - Para Bovinos.',
  '24 Bolos',
  'Cloruro de calcio, Sulfato de calcio mono y diglicéridos de ácidos grasos esterificados con ácido acético.',
  '',
  ARRAY['bovino'],
  'https://www.boehringer-ingelheim.com/sa/salud-animal/productos/bovikalcr',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ecto Tak Zoovet x 5lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b76e8ffb68fa40b88beefe2eb7e66736~mv2.png',
  'Antiparasitario externo - Garrapaticida sistémico pour on- Para: Bovinos.',
  '5lt.',
  'Fluazurón 2,5%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/328-ecto-tak',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Hepatone Richmond 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5e5517ddbef14b228e48a75c8af74e95~mv2.png',
  'Protector y estimulante de la función hepática - Para: Bovinos, Equinos y Ovinos.',
  '250ml.',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=30&amp;id=31&amp;pg=1',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'DIB 1gr Zoetis Syntex 10 dispositivos.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6076b4a48f5446b8bac4e08585606b1a~mv2.png',
  'El Dispositivo Intravaginal Bovino Zoetis (DIB) es un dispositivo intravaginal impregnado de progesterona utilizado para la regulación del ciclo estral en bovinos. La progesterona liberada a partir de la colocación del dispositivo tiene un papel importante sobre la dinámica folicular ovárica. Los niveles supraluteales > 1 ng/ mL obtenidos a los pocos minutos de la introducción del dispositivo, provocan la regresión del folículo dominante y aceleran el recambio de las ondas foliculares. Esta interrupción de la secreción folicular de estrógeno e inhibina, produce el aumento de FSH responsable del inicio de la siguiente onda folicular. Por otro lado, la extracción del dispositivo provoca la caída de progesterona a niveles subluteales < 1 ng/mL, que inducen el incremento de la frecuencia de los pulsos de LH, el crecimiento y la persistencia del folículo dominante con concentraciones muy altas de estradiol, que provoca por un lado el celo y a nivel endócrino inducen el pico de LH que es seguido por la ovulación. - Para: Bovinos.',
  '1g',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tiamina Rio de Janeiro 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d7a85f13d08848f7ad4df9f32ae78c6f~mv2.png',
  'Profilaxis y tratamiento de estados carenciales de tiamina.. - Para Bovinos y Equinos.',
  '50ml.',
  'Vitamina B110g',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/91',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Birmicina E25 Burnet 40ml',
  5323.4,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Burnet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9adbe47cf55e45e6be35e349788be894~mv2.png',
  'el sulfato de estreptomicina es un antibiótico aminoglucósido especialmente orientado hacia los microorganismos Gram negativos y Gram positivos. Difunde con rapidez por todo el organismo alcanzando incluso, al humor acuoso y vítreo. Supera con facilidad la placenta, pasa al líquido amniótico y a la sangre fetal, en la que logra concentraciones cercanas a las de la mitad de la sangre materna. - Para: Bovinos, Ovinos y Equinos.',
  '40ml',
  'Estreptomicina sulfato 25 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://burnet.com.ar/birmicinae25/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Lidocalm Pro-Ser x100',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_d0a12d241ec44a8b8337e41320ec885d~mv2.png',
  'Solución anestésica a base de Lidocaína para animales grandes y pequeños. - Para: Bovinos y Equinos.',
  '',
  'Lidocaina:2 g',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.labproser.com.ar/prod_03.htm',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Fortevit ADE Leon Pharma 100ml.',
  13698.75,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6e0573375dc64bceab8f5c9787752e39~mv2.png',
  'Mineralizante - Vitamínico. Solución inyectable. - Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Vitamina A 25.000.000 UI',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Floxanol 5 Leon Pharma 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_fa1631c13be043f4996ec0acf2456cfb~mv2.png',
  'Antimicrobiano inyectable de amplio espectro. Quinolona.. - Para: Bovinos.',
  '5 L',
  'Enrofloxacina5%',
  '',
  ARRAY['bovino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilmilon 300 Leon Pharma 100ml.',
  13647.2,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_70ae13837783406ea0e637e81a0591cc~mv2.png',
  'Antibiótico macrólido de amplio espectro.. - Para: Bovinos.',
  '300 L',
  'Tilmicosina30 g',
  '',
  ARRAY['bovino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Flok 3,15 Biogenesis Bago 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6d98c9948ea94367aa81cdf568008e1a~mv2.png',
  'Antiparasitario interno y externo altamente efectivo para el control y tratamiento de los parásitos gastrointestinales y pulmonares, sarna, miasis y garrapatas de bovinos y ovinos. Solución inyectable de doramectina al 3,15% lista para usar. - Para: Bovinos y Ovinos.',
  '500ml.',
  'Doramectina, 3,15 g',
  '',
  ARRAY['bovino', 'ovino'],
  'https://biovademecum.biogenesisbago.com/endectocidas/flok-315',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Rochy Spray Zoovet 267ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ede56d1b9acb45ada129de633e954b96~mv2.png',
  'Antiparasitario externo - Curabicheras - Antimicrobiano - Cicatrizante - Para: Bovinos - Ovinos - Equinos.',
  '267ml.',
  'Contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.zoovet.com.ar/grandes-animales/item/330-rochy-curabicheras-aerosol',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Zeleris Zoovet 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e599bafb3fd348ad9724f00b8209229f~mv2.png',
  'Antibióticos - Quimioterápicos clásicos y combinados - Para: Bovinos.',
  '100ml.',
  'Florfenicol: 0.4 g',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/587-zeleris',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overmectina F Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e2bb98a334bc4ff7aaff8d8ae1011070~mv2.png',
  'Antiparasitario interno y externo. - Para: Bovinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'https://over.com.ar/product/overmectina-f/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Synect Polvo Over 400gr.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5144eff3895c49fdb71d0ba877773f09~mv2.png',
  'Antiparasitario externo. Curabicheras. Cicatrizante con bacteriostático. - Para: Bovinos, Equinos y Ovinos.',
  '400g',
  'Cada 100 g contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://over.com.ar/product/synect-curabicheras-polvo/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aplonal Konig 50ml.',
  8838,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_fca039cd63ab4d62a6451a08f490db66~mv2.png',
  'El Analgésico, antipirético, antiendotóxico y antiinflamatorio no esteroide de máxima potencia. - Para Equinos.',
  '50ml.',
  'Cada mL contiene:',
  '',
  ARRAY['equino'],
  'https://www.koniglab.com/producto/aplonal-5/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kuramicina L.A. Konig 500ml.',
  32414.25,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_46013363b3cf4f1fa416cf36cbded3d3~mv2.png',
  'Antibiótico inyectable de acción inmediata y prolongada. - Para Bovinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.koniglab.com/producto/kuramicina-l-a/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bactrovet Plata AM Dualtap Spray Curabichera Konig 420ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e7f3aa831c804d6e9a6a28aa0422fb40~mv2.png',
  'Aerosol con cánula incorporada para heridas profundasCurabichera cicatrizante hemostático de alta adherencia. - Para: Bovinos, Ovinos y Equinos.',
  '420ml.',
  'Cada 100 gramos de concentrado contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.koniglab.com/en/producto/bactrovet-plata-dual-tap/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Duphamox LA Zoetis 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_af7c0983a00f4a80a706e4eb77b434a7~mv2.png',
  'La amoxicilina es un antibiótico bactericida de amplio espectro perteneciente a los betalactámicos. Impide la síntesis de la pared celular bacteriana por inhibición de las enzimas traspeptidasa y carboxipeptidasa. Formulado para alcanzar una larga acción, llegando a las mayores concentraciones séricas en poco menos de dos horas persistiendo como mínimo 4 horas. Activo frente a Leptospira spp, Gram positivas: Actinomyces, Bacillus anthracis, Clostridium spp, Corynebacterium spp, Erysipelothrix rhusiopathiae, Listeria monocytogenes, Staphylococcus spp, Streptococcus spp, Gram negativas: Actinobacillus spp, Bordetella bronchiseptica, Escherichia coli, Fusobacterium spp, Haemphilus spp, Moraxella spp, Pasteurella spp, Proteus mirabilis, Salmonella spp. - Para Bovinos y Ovinos',
  '100ml.',
  'Amoxicilina, trihidrato: 15 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'https://ar.zoetis.com/products/bovinos/duphamox.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Randon Titanium Konig 500ml.',
  33932.1,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ac97de54cda141a3b8a2965811c36f22~mv2.png',
  'Endectocida (endoparasiticida y ectoparasiticida) inyectable - Para: Bovinos.',
  '500ml.',
  'Cada 100 mL contiene:',
  '',
  ARRAY['bovino'],
  'https://www.koniglab.com/producto/randon-titanium/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Micospectone Von Franken 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_acdc7f60ea4848f28b3144547fa5cda6~mv2.png',
  'Antibiótico de amplio espectro - Para: Bovinos y Ovinos.',
  '250ml.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  'https://www.fatrovonfranken.com/detalle-productos/micospectone/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Encefalomielitis Equina Providean Tecnovax 20 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bd5dab6eb24344f68ed16d9eeaa514bd~mv2.png',
  'Prevención o profilaxis de la Encefalomielitis en Equinos. - Equinos.',
  '20 dosis.',
  '',
  '',
  ARRAY['equino'],
  'https://tecnovax.com/producto/providean-contendor-encefalo/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Linco 300 Zoovet 100ml.',
  41359.45,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ccb9423d14ca43ffb06016085e15849e~mv2.png',
  'Infecciones por gérmenes Gram (+) del tracto respiratorio, genitourinario, piel y tejidos blandos, huesos y articulaciones. - Para: Bovinos.',
  '100ml.',
  'Lincomicina (como Clorhidrato) 30 %.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/256-linco-300-ga',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilmicofull Dúo Inyectable Zoovet 250ml.',
  63288.45,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0965c7a14480411389db90b74cbc75fa~mv2.png',
  'Tratamiento de enfermedades infecciosas causadas por microorganismos Gram (+), Gram (-) y micoplasmas sensibles a la Tilmicosina. - Para: Bovinos.',
  '250ml.',
  'Tilmicosina 30%',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/292-tilmicofull-duo-inyectable',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilmicofull Dúo Inyectable Zoovet 100ml.',
  27406.1,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d36c3f443fd04a4eb5316d7b692fd214~mv2.png',
  'Tratamiento de enfermedades infecciosas causadas por microorganismos Gram (+), Gram (-) y micoplasmas sensibles a la Tilmicosina. - Para: Bovinos.',
  '100ml.',
  'Tilmicosina 30%',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/292-tilmicofull-duo-inyectable',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Salix MSD 10ml.',
  13757.65,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e4180d9dae134947871b7b03e9d48768~mv2.png',
  'Diurético – Salurético. - Para Bovinos y Equinos.',
  '10ml.',
  'estimulantes, autointoxicaciones intestinales o miógenas, etc.), la inyección endovenosa, y luego intramuscular de acuerdo al criterio del profesional, causa resultados concluyentes. Como sugerencia para otras aplicaciones prácticas de Salix® exponemos, de acuerdo a lo extractado de la abundante literatura internacional sobre el uso de esta droga en Veterinaria, casos clínicos tratados, en los cuales Salix® surtió óptimo resultado.',
  '',
  ARRAY['bovino', 'equino'],
  'https://www.msd-salud-animal.com.ar/productos/salix-diuretico-veterinario/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Jeringa Lider Dial PRO 50c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_15228971f3484b6ea0e2ecbf0c9f0010~mv2.png',
  'Jeringa de cuerpo Plástico - Una jeringa liviana, precisa y ergonómica. Con la nueva jeringa Dial Pro se obtiene una dosificación precisa, evitando errores en la aplicación y por su diseño ergonómico y bajo peso se puede trabajar de manera cómoda incluso en largas jornadas de trabajo.',
  '50c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Endoral Von Franken 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b2f0109330a94d33873a0aa94e2085a5~mv2.png',
  'Antiparasitario Interno. Tratamiento de parasitosis gastrointestinales (Nematodes), parasitosis pulmonares (Dictyocaulus), tenias (Anaplocephalidos), y parasitosis hepáticas (Fasciola hepática adulta). - Para: Bovinos.',
  '1l.',
  'Albendazol 10,00 g',
  '',
  ARRAY['bovino'],
  'https://www.fatrovonfranken.com/detalle-productos/endoral/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Advocin 180 Zoetis 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c571f73937814024b27e4800eec85aa8~mv2.png',
  'a solución inyectable de Advocin 18% es un agente antimicrobiano de amplio espectro perteneciente a la clase de las Fluoroquinolonas, con actividad contra una amplia gama de bacterias Gram negativas, Gram positivas y micoplasmas. Advocin 18 % exhibe una actividad rápidamente bactericida debido a la inhibición de la ADN girasa bacteriana y no es afectado por los mecanismos de resistencia bacteriana que influyen sobre otras clases de agentes antimicrobianos. Advocin 18% se absorbe con rapidez desde el sitio de la inyección y se distribuye a los tejidos destinatarios en concentraciones elevadas. - Para Bovinos.',
  '50ml.',
  'Cada 100 ml. de solución estéril contiene:',
  '',
  ARRAY['bovino'],
  'https://ar.zoetis.com/products/bovinos/advocin-180.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ciclase DL Zoetis 20ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b96368e77bb549b39c02c79fc48e005a~mv2.png',
  'Prostaglandina F2alfa, solución inyectable - Para: Bovinos.',
  '20ml.',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'zoetis.cl/productos-y-servicios/bovinos/ciclase-dl.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cipiosyn Cipionato de Estradiol 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_652cffaa25254c28a22f74343c931ba5~mv2.png',
  'El Cipionato de Estradiol (CPE) es un derivado semisintético de acción prolongada del 17 Estradiol, hormona esteroidea sintetizada por el folículo ovárico, desarrollada para optimizar los resultados de los tratamientos con progestágenos en bovinos. - Para: Bovinos.',
  '100ml.',
  'Cipionato de estradiol 50 mg',
  '',
  ARRAY['bovino'],
  'https://www.zoetis.co.cr/products/bovinos/cipiosyn.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Novormon 20000 Zoetis.',
  159168,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a248a712de294769bcc0d0a7fd459bb1~mv2.png',
  'Inducción y sincronización de celos - Inducción de la ovulación y superovulación - Para: Bovinos y Ovinos.',
  '',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ioduro de Sodio Zoovet 50ml.',
  15159.35,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2c7020459012495dacf141b407e2a224~mv2.png',
  'Quimioterápico - Antimicótico - Para: Bovinos.',
  '50ml.',
  '',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/itemlist/search?searchword=ioduro&amp;categories=9%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C31%2C32%2C170%2C172&amp;format=html&amp;t=&amp;tpl=search',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrolac Zoovet 1l.',
  40765.05,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_dbb87615e0bd4b5faae0f4ae2dd9de07~mv2.png',
  'Rehidratante - Energizante. - Para: Bovinos.',
  '1l.',
  '',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/itemlist/search?searchword=electrolac&amp;categories=9%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C31%2C32%2C170%2C172&amp;format=html&amp;t=&amp;tpl=search',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Algitocina Zoovet 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_88b7c7fbaf4c42ad83029593df4de444~mv2.png',
  'Antiinflamatorio no esteroide - Hormonal - Para: Bovinos y Equinos.',
  '100ml.',
  'Oxitocina 400 UI',
  '',
  ARRAY['bovino', 'equino'],
  'https://www.zoovet.com.ar/grandes-animales/itemlist/search?searchword=algitocina&amp;categories=9%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C31%2C32%2C170%2C172&amp;format=html&amp;t=&amp;tpl=search',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Folirec Zoovet 30ml.',
  54205.15,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e6bb8bb5e9f1477fa5e71bf790efe0f6~mv2.png',
  'Manejo de la reproducción - Hormonal - Gonadotrofina - Para: Bovinos.',
  '30ml.',
  '',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/414-foli-rec-liquido',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Folirec Zoovet 100ml.',
  149077,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a04178f02cdd4d35b2f1e2802942ffbe~mv2.png',
  'Manejo de la reproducción - Hormonal - Gonadotrofina - Para: Bovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/414-foli-rec-liquido',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Oleovet ADE Inyectable Zoovet 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_77aadcd5ec72405b853bb85be1f5e01b~mv2.png',
  'Estados carenciales, estrés; coadyuvante en procesos infecciosos y/o parasitarios - Retraso del celo - Raquitismo y osteomalacia. - Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Vitamina A Palmitato 25.000.000 UI.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.zoovet.com.ar/grandes-animales/item/438-oleovet-ade-inyectable',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pinza Elastrator Primor',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_80ac4bb76b8c44d28d882086bda6fd5f~mv2.png',
  'Pinza para anillos Elastrator Primor - Pinza para castración.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Rodilon Bayer 1kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Bayer' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e9794c6d1d204b0caaa14d6cf67c9f5f~mv2.png',
  'Nueva formulacion Rodilon® BLOQUE EXTRUSADO de 15 gr. con nervaduras en dos de las superficies expuestas.',
  '1kg.',
  'Difethialone 0,0025 g',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cetri-Amon Ale-bet 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Ale Bet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a31330388ec94fd4968b60f53da801ec~mv2.png',
  'Detergente catiónico con acción antiséptica notable a base de amonio cuaternario - Disminuye en presencia de sulfatos o jabones - Bactericida, desinfectante, antiséptico, desodorizante, fungicida - No ocasiona en la dilución indicada irritación en la piel sana, ni en las heridas. - Para: Bovinos.',
  '1l.',
  'Cada 100 ml de Cetri-Amon contiene:',
  '',
  ARRAY[]::text[],
  'https://www.ale-bet.com.ar/aves/cetriamon.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Optimizador Bio Agro Insumos 500ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_bb8c6eabd1b247eab1e0a36315958eeb~mv2.png',
  'Suplemento vitamínico, mineral y de aminoácidos - Para: Bovinos y Ovinos.',
  '500ml.',
  'Fosforilcolamina 2,00 g',
  '',
  ARRAY['bovino', 'ovino'],
  'https://laboratoriosagroinsumos.com/producto/optimizador-bio/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'IR9 Rosenbusch 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rosenbusch' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_49d1a89093c34493abd8515958763f6f~mv2.png',
  'Vacuna Clostridial multiple indicada para la prevención de: Mancha, Gangrena Gaseosa, Hepatitis Infecciosa Necrosante, Icterohemoglobinuria Bacilar Infecciosa, Enterotoxemia, Cabeza hinchada de los lanares y Muerte súbita. Destinada a bovinos, ovinos - Para: Bovinos - Ovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  'https://rosenbusch.com/argentina/gprodbio_clostridiales.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vermiplex Plus 500 Konig 26gr.',
  8055.9,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2ba14da91c114492bcbe1463bf70f983~mv2.png',
  'Antiparasitario de espectro amplio para equinos, yeguas preñadas, potrillos, P.S.C. en training - Antihelmíntico en pasta de espectro total y acción ovicida, larvicida y adulticida - Tiene acción sistémica (eliminando las larvas en fase migratoria) y local a nivel del tracto gastrointestinal. - Para: Equinos.',
  '26g',
  'Cada 100 g contiene:',
  '',
  ARRAY['equino'],
  'https://www.koniglab.com/producto/vermiplex-plus/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Faxidan Konig 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5e0bcc357990414aa32ef234cfbfae48~mv2.png',
  'Antiparasitario interno de amplio espectro con máximo poder Fasciolicida - Para: Bovinos y Ovinos.',
  '500ml.',
  'Cada mL contiene 200 mg de nitroxinilo de levamisol',
  '',
  ARRAY['bovino', 'ovino'],
  'https://www.koniglab.com/producto/faxidan/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Control Part Konig 50ml.',
  7155,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9e5d1973cf724828a197f3c0a483bcbb~mv2.png',
  'Solución Inyectable - Relajante del musculo liso uterino - Agente tocolítico - Relaja intensa y prolongadamente el músculo liso uterino, facilitando maniobras obstétricas antes, durante y después del parto - Mejora el suministro de sangre a la placenta y al feto durante la fase de relajación miometrial completa. - Para Bovinos, Equinos y Ovinos.',
  '50ml.',
  'Clenbuterol 3,2 gm%',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.koniglab.com/producto/control-part/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kuramicina MAX Konig 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_abde106c0c8b4597b1c300a0c0bc3b11~mv2.png',
  'Kuramicina Max, es una moderna formulación de acción dual - La oxitetraciclina de larga acción, genera en una sola aplicación, 5 días de terapia antimicrobiana y la flunixina, un potente antiinflamatorio, analgésico y antipirético, brinda una terapia sintomática rápida y eficaz. - Para Bovinos y Ovinos.',
  '250ml.',
  'Cada mL contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'https://www.koniglab.com/producto/kuramicina-max/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Entero Relax Duo Zoovet x50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_830bc34281cb465f80971130034ea7f6~mv2.png',
  'Antidiarreicos - Hipersecretores - Analgésico - Espasmolítico - Para: Bovinos, Equinos.',
  '50ml.',
  'Hioscina Butilbromuro 0,4%',
  '',
  ARRAY['bovino', 'equino'],
  'https://www.zoovet.com.ar/grandes-animales/itemlist/search?searchword=entero&amp;categories=9%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C31%2C32%2C170%2C172&amp;format=html&amp;t=&amp;tpl=search',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Interfen Leon Pharma 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_98904b4af1d24e91b47a9f11786263fb~mv2.png',
  'Antihelmintico intraruminal - Tratamiento y control de parásitos gastrointestinales y pulmonares - Para: Bovinos, Ovinos.',
  '5l.',
  'Fenbendazol 10%',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Fluxin 5 Leon Pharma 100ml.',
  13937.3,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_775cc9c331114973a3247d63c5d960b8~mv2.png',
  'Moderno antiinflamatorio inyectable, no esteroide con acción analgésico y antipiretico - Para Bovinos, Equinos.',
  '5 L',
  'Flunixin Meglumina 5%.',
  '',
  ARRAY['bovino', 'equino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Fluxin 5 Leon Pharma 50ml.',
  9785.45,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c3025909ccbd447f81662a7722100964~mv2.png',
  'Moderno antiinflamatorio inyectable, no esteroide con acción analgésico y antipiretico - Para Bovinos, Equinos.',
  '5 L',
  'Flunixin Meglumina 5%.',
  '',
  ARRAY['bovino', 'equino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dexa LP Leon Pharma 100ml.',
  7251.45,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f09330900e8e4e50bf315242d91e36bf~mv2.png',
  'Corticosteroide, Antialérgico y Antiflogístico. - Para bovinos, Equinos y Ovinos.',
  '100ml.',
  'Dexametasona Fosfato Sódico 200 mg',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tres Quince Leon Pharma 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_89f1ff004aaa4b5dbbc9561c411e5fe7~mv2.png',
  'Endectocida. Garrapaticida. Larga acción. - Para: Bovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilflex 375 Leon Pharma 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Leon Pharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6af749098c664d2c8022a8d068e336c6~mv2.png',
  'TILFLEX 375 es un producto que combina un antibiótico de amplio espectro, buenas características farmacocinéticas y pocos efectos colaterales como la tilmicosina, junto a un antiinflamatorio no esteroide con actividad analgésica, antipirética y antiinflamatoria, el diclofenac. - Para: Bovinos.',
  '375 L',
  'Fosfato de Tilmicosina 30,0 g',
  '',
  ARRAY['bovino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Jeringa Automática Dial Millenium Primor 50c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_d0c0054b968342618e20eeb0122ac939~mv2.png',
  'CONSULTAR PRECIO. Administración precisa y rápida, con rango de dosificación ajustable - La Jeringa Automática Primor evita errores en la aplicación y dosificación de substancias que requieren precisión.',
  '50c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dovertec Dorado Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_17c4a25ad85b4ad390c6891577436532~mv2.png;06b954_2c0bbdf8129748febb10764093b162f4~mv2.png',
  'Endectocida inyectable de acción prolongada - Tratamiento y control de parasitosis externas e internas que afectan a los bovinos - Para: Bovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'https://over.com.ar/product/dovertec-dorado/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bactroflay Konig 1l.',
  27388,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d6840858f0bd49bc92298f4aae778f7b~mv2.png',
  'Antiparasitario externo pour on sin restricción en leche y con mínima restricción en carne. Poder residual excelente. - Para: Bovinos.',
  '1l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.koniglab.com/producto/bactroflay-pour-on/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Derribante ACA 5l.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8817036d066e49e39d44801a8f52397d~mv2.png',
  'Antiparasitario externo, aplicacion Pour on, para el control de Mosquicida para Bovinos. - Para: Bovinos.',
  '5l.',
  'Cipermetrina 4%',
  '',
  ARRAY['bovino'],
  'https://www.acamarket.com.ar/derribante-pour-on-5-litros.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bactroflay Konig 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9ddf7f8381ac40d1b314210e8cf4ac44~mv2.png',
  'CONSULTAR PRECIO. Antiparasitario externo pour on sin restricción en leche y con mínima restricción en carne. Poder residual excelente. - Para: Bovinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.koniglab.com/producto/bactroflay-pour-on/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Carretel con Hilo x500 mts 12 hebras Carreteles Rafaela.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_062d34ccd14b40e0b16361235380c51b~mv2.png',
  'Carretel con hilo de 500mts 12 hebras.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Coagulante Chinfield 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Chinfield' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5ac2f0ca0a9f43a28d903dfec3c5248f~mv2.png',
  'Consultar precio. Antihemorrágico - cubre todo el cuadro de hemorragias cualquiera sea su etiología y localización merced a los dos componentes activos de su formulación, que lo distinguen como un producto único en su género - Para Bovinos, Equinos.',
  '50ml.',
  'Ciclonamina (etamsilato) 15 g.',
  '',
  ARRAY['bovino', 'equino'],
  'https://chinfield.com/coagulante-chinfield/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dila T Vetue 100ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_0efa7c64b69f469e93b9931678235a1e~mv2.png',
  'Consultar precio. Clenbuterol, monodroga activa de DILA-T Bronquial, es una amina simpaticomimética que actúa sobrelos receptores beta 2 de la musculatura bronquial, provocando la broncodilatación, la aceleración de la expulsión del mucusobstructivo y la ventilación pulmonar - Además actúa sobre el miometrio de varias especies en forma anticonstrictiva. - Para Bovinos y Equinos.',
  '100ml.',
  'Clenbuterol, clorhidrato 3 mg.',
  '',
  ARRAY['bovino', 'equino'],
  'https://www.vetue.com.ar/productos-vetue/8-productos/29-dila-t-inyectable',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Curabichera Pomada Indio Rio de Janeiro 1kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_574013215f004343815b85d81af9d8ee~mv2.png',
  'Antiparasitario externo - Pasta curabicheras curativo y preventivo de miasis cutáneas, gusaneras o bicheras. - Para: Bovinos, Ovinos y Equinos.',
  '1kg.',
  'Fenitrotion al 95 % 5g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/165',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Parenteril Inyectable Zoovet 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9bfbcb77f0c041348fbc8bc2af1f7805~mv2.png',
  'Consultar precio. Antibiótico, Antiinflamatorio, Antipirético y Analgésico - Para: Bovinos.',
  '100ml.',
  'Espiramicina Adipato 5,5%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/itemlist/search?searchword=parente&amp;categories=9%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C31%2C32%2C170%2C172&amp;format=html&amp;t=&amp;tpl=search',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Broncomicina Zoovet 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_01a24d4a4e6e426d837b8fb4d8a54562~mv2.png',
  'Consultar precio. Antibitótico, Antiinflamatorio, Antipirético y Mucolítico - Para: Bovinos.',
  '250ml.',
  'Tilmicosina 30%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/itemlist/search?searchword=broncomi&amp;categories=9%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C31%2C32%2C170%2C172&amp;format=html&amp;t=&amp;tpl=search',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Entero Plus Jarabe Zoovet x500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_79b6a57ab3c34b0faefbdbaf3243317f~mv2.png',
  'Consultar precio. Bacteriostático intestinal - Antidiarreico- Para: Bovinos.',
  '500ml.',
  'Enrofloxacina 2,5%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/369-enteroplus-jarabe-ga',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Neumoxina Zoovet 50ml.',
  64564,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_48ea81b81e5c44fd8b322a9bd420a178~mv2.png',
  'Consultar precio. Antibiótico macrólido de larga acción- Para: Bovinos.',
  '50ml.',
  'Tulatromicina 10%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/268-neumoxina',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Llave de Corte Potrero.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8ef8d453d42f4cc7b25105160bec8130~mv2.png;06b954_6318835fab1e46f690773ae62aadb9e5~mv2.png',
  'Consultar precio. Una llave, con contactos en acero inoxidable. Úselas para conectar y desconectar sectores fácimente de acuerdo a la necesidad. También le permitirá trabajar por descarte en la búsqueda de una pérdida en el sistema. Incluye 2 tornillos auto roscantes para fijar al poste.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energo-mag Konig 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b1382e85c2734499a1df034f7de64dd7~mv2.png',
  'Consultar precio. Controla la hipomagnesemia. Preventivo y curativo de la vaca caída. - Para: Bovinos y Ovinos.',
  '250ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.koniglab.com/producto/energo-mag/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Lapiz Descornador Rio de Janeiro 8u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bcd13900dcc14ab3a709631c0257a572~mv2.png',
  'Consultar precio. Se caracteriza por la acción cauterizantedel hidróxido de potasio, el cual produce la coagulación de las células corneas, evitando asi su posterior crecimiento. - Para Bovinos y Ovinos.',
  '',
  'Parafina 2g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/67',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Miotonico Rio de Janeiro 10ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7c9d78780e374ac29097e3d3d4c728fe~mv2.png',
  'Consultar precio. Este preparado es de alto valor para controlar todos aquellos casos en que los animales necesitan de un estímulo vitamínico cardiotónico muscular. Por múltiples factores, en la época invernal o en la época de pastos de verdeos, es frecuente observar animales que muestran signos de deficiencia que se traducen por la falta de coordinación de movimientos, agitación y posteriormente caídas. - Para Bovinos.',
  '10ml.',
  'Niketamida 5.33g.',
  '',
  ARRAY['bovino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/71',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Rumio Tonic Rio de Janeiro 10ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_625890a1c4e0482f8ae83763e681ab04~mv2.png',
  'Consultar precio. Rumio Tonic es una combinación farmacológica ideada para el tratamiento de las disfunciones digestivas que cursan con disminución de la motilidad, ya sea gástrica o intestinal. - Para Bovinos, Ovinos y Equinos.',
  '10ml.',
  'Neostigmina metilsulfato 0.2g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/106',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Calcio 50 Rio de Janeiro 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0baf5aab78a845e59b0cfbc16cd693ac~mv2.png',
  'Consultar precio. Hipocalcemia, Hipomagnesemia y/o Deficiencia de Hierro. - Para Bovinos, Ovinos y Equinos.',
  '100ml.',
  'de alta capacidad en la generación de iones CALCIO-MAGNESIO y FOSFORO. La DIFENILHIDRAMINA, actúa mejorando el cuadro clínico general, normalizando la presión arterial; recordando que en dicho síndrome las masas musculares sometidas a dificultades circulatorias y la paresia digestiva complicante, figuran como focos de liberación de histamina, la que actúa sobre los vasos sanguíneos periféricos provocando \vasodilatación\; dando por lo tanto hipotensión arterial, obnubilación y decúbito. La Difenilhidramina contrarresta la acción de la histamina, facilitando así el metabolismo celular y un mejor ingreso y distribución de calcio a las células. El CALCIO 50% Magnesiado Fosforado R-J, contiene 200 mgr de difenilhidramina equivalente a un frasco de ANTIHISTAMINICO R-J, concentración preventiva y terapéutica del shock en todas sus presentaciones. Concentración Real: Testeado bajo los más altos estándares de Calidad. Es un producto RIO DE JANEIRO, de Laboratorios ALLIGNANI Hnos. S.R.L., una empresa que antepone lo profesional a lo comercial por ética y prestigio de la Medicina Veterinaria.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/30',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Antitóxico Rio de Janeiro 20ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_007ff5e12d0d4f64a69ff2124e949150~mv2.png',
  'Consultar precio. El Antitóxico polivalente Río de Janeiro está indicado en todos aquellos casos de envenenamiento en que el origen de la intoxicación está dado por pastos cianógenos o de otros tipos, cuando no existe un antídoto específico. - Para Bovinos y Equinos.',
  '20ml.',
  'Niketamida 3.5g.',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/18',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pilocarpina 2% Rio de Janeiro 10ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_433ff42f5fc34c669edaa0e6f433e0e9~mv2.png',
  'Consultar precio. Catártico, estimulante de la musculatura lisa intestinal. - Para Bovinos.',
  '10ml.',
  'Pilocarpina clorhidrato 2g.',
  '',
  ARRAY['bovino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/74',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vermkon APR Konig 4lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1ff44c2da2f643f4a5e6e13b8df966e7~mv2.png',
  'Consultar precio. Antihelmíntico para ovinos. Acción contra Parásitos Resistentes. - Para: Bovinos.',
  '4lt.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['ovino'],
  'http://www.koniglab.com/producto/vermkon-apr/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Adenitis Equina Clinica Equina x25ds.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_42fe877db831444798dd28146453058d~mv2.png',
  'Consultar precio. Vacuna contra Adenitis o Moquillo equino por Streptococus equi. - Para: Equinos.',
  '',
  'Contiene cultivos de Streptococcus equi inactivados con formol y precipitados con sulfato de aluminio y potasio.',
  '',
  ARRAY['equino'],
  'http://clinicaequina.com.ar/productos-biologicos/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Carretel con Hilo x500 mts 9 hebras Carreteles Rafaela.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_c8776b7a537a46ea84b704738e1104d1~mv2.png',
  'Carretel con hilo de 500mts 9 hebras.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tiamina Hampton 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Hampton' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5e2413de9d4e4f549c2b4cbad23eb773~mv2.png',
  'Neuritis, polineuritis, síndromes ciáticos, reumatismos, algias, hepatopatías, para reforzar la fijación de glucógeno. - Para: Equinos.',
  '100ml.',
  'Tiamina Clorhidrato 30 g.',
  '',
  ARRAY['equino'],
  'https://www.calastreme.com.ar/producto/tiamina/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Suiferro Fuerte Chinfield 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Chinfield' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_3d4b2df2944b49b5ae56bace684848f6~mv2.png',
  'La anemia debida a deficiencia de hierro se presenta en el ganado, bovino y porcino y puede ser debida a falta de mineral en la alimentación así como a parasitosis, enfermedades infecciosas o constitucionales o deficiencias en la asimilación intestinal del hierro - SUIFERRO FUERTE asocia los tres elementos minerales que rigen el proceso de formación y maduración de los glóbulos rojos y la hemoglobina, en forma de sales orgánicas de asimilación retardada y en dosificación efectiva que simplifica el tratamiento a la administración de una dosis cada 30-45 días. - Para: Bovinos.',
  '50ml.',
  'Edetato de Sodio y Hierro 10.000 mg.',
  '',
  ARRAY['bovino'],
  'https://chinfield.com/suiferro-fuerte-2/?cat=bovinos',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Metaxona Weizur 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Weizur' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4087f56a3b754eb29c9f1985dbdcaecf~mv2.png',
  'Antiinflamatorio esteroide. - Para Bovinos, Equinos, Porcinos, Ovinos, Caninos y Felinos.',
  '100ml.',
  'Dexametasona (como 21 fosfato sódico) 2 Mg/ Ml',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.weizur.com/producto/metaxona/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Hilo para Sutura Interna Catgut Able.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_f4259e23c73341da8f33f8621db950b2~mv2.png',
  'Especial para la realización de suturas internas. Para: Bovinos - Ovinos - Equinos.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tiza para marcar Lanares Patente.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_7f7f035efc804f89b5b14bca39cbbc35~mv2.png',
  'Tiza para marcar lanares Patente. Para: Ovinos.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Hoja para Bisturí Swann-Mortom.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_9c4e2fdf25784ff3b3635e99cc1f7a05~mv2.png',
  'La cuchilla N.º 24 tiene una forma semicircular y está también afilada a lo largo de su filo frontal. Se utiliza para realizar incisiones largas en cirugía general y también en procedimientos de autopsia, la N.º 24 se adapta a los mangos 4 4L 4 Graduado y amp; 6B..',
  '',
  '',
  '',
  ARRAY[]::text[],
  'https://es.swann-morton.com/product/46.php',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Amantina Ale-bet 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Ale Bet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8251a2585ed4444a9afdac1d83b12257~mv2.png',
  'Altas concentraciones de cobre cobalto zinc permiten su almacenamiento en las células hepáticas para el aprovechamiento del animal en función de su carencia tanto primaria como secundaria de dichos minerales que se presentan como: pérdida de peso, lento desarrollo, alopecias, infertilidad, bajos índices reproductivos, diarreas no específicas, fracturas espontáneas, alteración de pezuñas. Además, su utilización periódica previene la aparición de la queratoconjuntivitis infecciosa bovina en rodeo. - Para: Bovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'https://www.ale-bet.com.ar/bovinos/amantina.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Clostridial Polivalente 10P Providean Tecnovax 60 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a6ef28b6e340441684b3e659b4e8e0b8~mv2.png',
  'Vacuna decavalente para la protección de enfermedades clostridiales, tétanos y neumonías - Para: Bovinos - Ovinos.',
  '60 dosis.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  'https://tecnovax.com/producto/providean-clostridial-10p/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ziflor Fenac Zoovet 100ml.',
  21351.8,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_428d6d0ac512449486bc31a0b406e6d9~mv2.png',
  'Antimicrobiano - Antibiótico - Antiinflamatorio no esteroide - Flofernicol + Diclofenac- Para Bovinos.',
  '100ml.',
  'Florfenicol 30 %',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/grandes-animales/item/296-ziflor-fenac',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit Reproductivo Carne Sincrover 700 Over 100 dispositivos.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2dfd493060c54243a7f5040ff046d3c5~mv2.png',
  'Control del ciclo estral en vaquillonas y vacas - Sincronización de celo - Tratamiento del anestro post parto - Acortamiento del período concepción-parto. - Para: Bovinos.',
  '100 dispositivos.',
  '',
  '',
  ARRAY['bovino'],
  'https://over.com.ar/product/kits-reproductivos-over/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cipersin Biogénesis Bago 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_53a1e0aca98e4da9a54b581d24f93fd0~mv2.png',
  'Garrapaticida bovino, antisárnico y melofaguicida ovino. Líquido emulsionable. - Para: Bovinos y Ovinos.',
  '5l.',
  'Cipermetrina 20 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.biogenesisbago.com/ar/productos/id65/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Poncho Resero.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2c148bfa3e9844cbbe33583cd473a91b~mv2.png',
  'El Poncho Resero es un producto 100% impermeable ideal para el uso de cabalgatas en días lluviosos, ya que cubre el cuello, recado y las ancas del animal mientras el jinete también se proteje de la lluvia.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bota Calfor Pampeana.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_fc22499d14c746f08317fdb285e42b66~mv2.png',
  'Para realizar tareas rurales en general, la bota Calfor Pampeana ofrece comodidad y flexibilidad sin perder la calidad y seguridad que la caracteriza.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Traje de Lluvia Ombu.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_a2318c325760401092e7c2130d048708~mv2.png;06b954_745aac1c33fa48b28a3e5bd5b5d2a731~mv2.png;06b954_8d3491d6e1f44c28a30386303908621f~mv2.png;06b954_6a409fdd655d437aa280baafaeb4fbc4~mv2.png;06b954_7f7f8c4dab114501a84465016b495194~mv2.jpg',
  'El traje de lluvia OMBU es ideal para el uso en las tareas rurales, pesca, fumigación. Resistente y de muy buena calidad, Ombu ofrece un producto confiable y seguro.',
  '',
  '',
  '',
  ARRAY[]::text[],
  'https://ombuindumentaria.com.ar/producto/traje-de-lluvia/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Eprinover Over 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0ab346b2372f4c98b5796bbbc023a438~mv2.png',
  'Antiparasitario interno y externo. - Para: Bovinos.',
  '1l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'https://over.com.ar/en/product/eprinover-pour-on/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Gonaxal Biogénesis Bago 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b236c74fc65c49278a6732916bdee394~mv2.png',
  'Es una solución inyectable de acetato de buserelina al 0,00042%, análogo sintético del de GnRH hipotalámica. Producto para el aparato reproductor y manejo de la reproducción en hembras bovinas y equinas - Para: Bovinos - Equinos.',
  '50ml.',
  '',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.biogenesisbago.com/ar/productos/id88/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ultrachoice 8 Zoetis 50 dosis 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c782e43c95174762b020fb30b472e28f~mv2.png',
  'Vacuna acterina-Toxoide de Clostridium chauvoei-septicumhaemolyticum-novyi-sordelliiperfringens - Para: Bovinos - Ovinos.',
  '50 dosis 100',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  'https://ar.zoetis.com/products/bovinos/ultrachoice.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Guantes largos para examinación Super Flex 100u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_465a016e0ba24ef789fc9a142276e923~mv2.png',
  'Guantes largos descartables para tacto, maniobras obstétricas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ripercol L Fosfato Zoetis x250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_de52cc17f08b4065b1223fd9ec709c68~mv2.png',
  'Antiparasitario e inmunoestimulante para control de parasitosis gastrointestinales y pulmonares - Para: Bovinos.',
  '250ml.',
  'Levamisol, fosfato: 18,8 g.',
  '',
  ARRAY['bovino'],
  'https://ar.zoetis.com/products/bovinos/ripercol-l-fosfato.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cipionato de Estradiol Von Franken 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8be122a851af4fe3a37aa4bb9723969f~mv2.png',
  'Complemento en la inducción y sincronización de celos- Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Cipionato de estradiol 50 mg',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.fatrovonfranken.com/es/large-animals/product-details/cipionato-de-estradiol-von-franken/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Flunixin Antiinflamatorio Dairyfarma 50ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_59650771444a466d909a124a4627c21e~mv2.png',
  'Moderno antiinflamatorio inyectable, no esteroide con acción analgésico y antipiretico - Para Bovinos.',
  '50ml.',
  'Flunixin Meglumina 5%.',
  '',
  ARRAY['bovino'],
  'http://www.dairyfarma.com.ar/antiinflamatorio-df/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit Sinergia Engorde Zoovet 2 x 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_263f77e4fd144c66bc2c7b949d1da8f4~mv2.png;06b954_58c00f0b43944623a71414b71cd7b566~mv2.png',
  'Desde el ingreso al engorde hasta el fin del ciclo (Feed lot o Pastura suplementada) - Está pensado para mejorar la conversión al energizar, hacer descender el estrés, dar una sólida inmuno estimulación, vitaminizar y aportar una mineralización general estratégica de animales durante el engorde - Para: Bovinos.',
  '500ml.',
  ':',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/images/Folletos/kitsinergia.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit Sinergia Recría Zoovet 2 x 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2453524211f64de9b29f0a697cdb4c5f~mv2.png;06b954_179619ada28b489aa42e922bf09c183a~mv2.png',
  'Desde el nacimiento hasta el destete - Está pensado para acelerar el crecimiento al dar una sólida inmuno estimulación, vitaminización y aporte de minerales estratégicos, imprescindibles en la etapa de la cría - Para: Bovinos.',
  '500ml.',
  ':',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/images/Folletos/kitsinergia.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Broncomicina Zoovet 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_01a24d4a4e6e426d837b8fb4d8a54562~mv2.png',
  'Tratamiento y prevención de enfermedades infecciosas producidas por microorganismos sensibles a la Tilmicosina. - Para: Bovinos.',
  '100ml.',
  'Tilmicosina 30%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/es/grandes-animales/item/228-broncomicina',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Floxa Max 10% Zoovet 100ml.',
  39788.2,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_637fb607e2fd4145b81e178a51b721f4~mv2.png',
  'Control de infecciones provocadas por bacterias Gram (+), Gram (-), micoplasmas y clamidias - Para: Bovinos y Ovinos.',
  '100ml.',
  'Enrofloxacina 10%.',
  '',
  ARRAY['bovino', 'ovino'],
  'zoovet.com.ar/es/grandes-animales/item/252-floxa-max-10',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Jeringa Automática Fix Master 50c.c.',
  33960,
  NULL,
  'https://static.wixstatic.com/media/06b954_6a620bafa076464bbb25e10ceb864a8c~mv2.png',
  'Administración precisa y rápida, con rango de dosificación ajustable - La Jeringa Automática Fix evita errores en la aplicación y dosificación de substancias que requieren precisión.',
  '50c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit Reproductivo Diprogest 600 Zoovet 50 dispositivos.',
  126315,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a12e60342a994f8e812b14c997c2abd8~mv2.png',
  'Presentación comercial que contiene todos los elementos necesarios para la ejecución de los protocolos de IATF clásicos en hembras bovinas. - Para: Bovinos.',
  '50 dispositivos.',
  '',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/es/grandes-animales/item/424-kit-reproductivo-diprogest-600-50-dosis',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overmectina Triplex Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b942cb454a0e43c9973042436c5598fe~mv2.png',
  'Antiparasitario interno y externo de amplio espectro. - Para: Bovinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.over.com.ar/product/overmectina-triplex-2/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Agroforce 20 SC Fipronil 20% Huagro 1lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_27245ed11dfa47d3b248ef019c3614a4~mv2.png',
  'Es un Insecticida que corresponde a un nuevo grupo químico, el de los fenil pirazoles. Actúa por contacto e ingestión, afectando el sistema nervioso central de los insectos.Agroforce 20 SC tiene uso contra las principales plagas: lepidópteros, ortópteros y contra larvas de coleópteros en los suelos, entre otros.También es usado para el control de hormigas y cucarachas.',
  '1lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'D.R.M. 1% Doramectina Zoovet 500ml.',
  64566.7,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f1204b10b56c49f9852aaf69b67d12b1~mv2.png',
  'Endectocida indicado para el tratamiento y prevención de nematodes (parásitos redondos) y parásitos externos, incluidas las tan temidas miasis multicavitarias de verano (bicheras) - Para: Bovinos - Ovinos.',
  '500ml.',
  'Doramectina 1 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'https://www.zoovet.com.ar/images/Folletos/drm.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tocon Extra Dow 1lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9b6d43418b4348e4b80505792ef8519f~mv2.png',
  'Tocon Extra es un herbicida para control de malezas de porte arbustivo y sub-arbustivo en áreas de pasturas.',
  '1lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pastar Gold Dow 5lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7217d87cd2a7482c8374231475f2d724~mv2.png',
  'Pastar Gold es un herbicida sistémico de aplicación foliar, recomendado para el control de malezas de hoja ancha, semi-leñosas y leñosas en áreas de pasturas de gramíneas.',
  '5lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Eprinex Boehringer Ingelheim x 2,5lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bc040d4b5379476d9c873726df334de3~mv2.png',
  'Endectocida de aplicación pour on, sin restricción prefaena ni descarte de leche - Primer endectocida sin restricción prefaena ni descarte de leche - Resistencia al agua - Alta eficacia en piojos y Cooperia - Puede aplicarse en cualquier momento y condición climática - Calidad de leche asegurada - Seguridad y efectividad en el control de los parásitos mencionados - Para: Bovinos.',
  '2,5lt.',
  'Eprinomectina 5gr.',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Selevit Energy Zoovet 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7eab976d3c3348acb0f7bda6240f060e~mv2.png',
  'Como energizante y fuente de minerales y/o vitaminas. Especial para el crecimiento, lactación y engorde. - Para: Bovinos, Equinos y Ovinos.',
  '500ml.',
  'Hipofosfito de Sodio 15%.',
  '',
  ARRAY['bovino', 'ovino'],
  'https://www.zoovet.com.ar/es/grandes-animales/item/446-selevit-energy',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vaquero Pour-on Zoovet x 5lt.',
  396314,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c5f1281e2e444e2a82c89defb92ce7fe~mv2.png',
  'Antiparasitario externo Pour-on - Piojicida - Endectocida - Garrapaticida.- Para: Bovinos.',
  '5lt.',
  'Fipronil 2%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/es/grandes-animales/item/354-vaquero-pour-on',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Endectomicín ADE 4% Zoovet 500ml.',
  50149.7,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_62b6ec3cef4b4f40ab3d0a9f330456c3~mv2.png',
  'Endectocida - Suplemento vitamínico de acción persistnete - Para: Bovinos - Ovinos.',
  '500ml.',
  'Ivermectina 4%.',
  '',
  ARRAY['bovino', 'ovino'],
  'https://www.zoovet.com.ar/es/grandes-animales/item/346-endectomicin-ade-4',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Mamyzin P Boehringer Ingelheim 10 fr. y ampollas solventes.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_22b1d19ce438474c92e9dd1f06a7938f~mv2.png',
  'Antibiótico inyectable - Para Bovinos.',
  '',
  'Penetamato, yodhidrato 5.000.000 U.I.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.boehringer-ingelheim.mx/salud-animal/bovinos/mamyzin-m',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Trifect Forte Over.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7c08bc246bcc4f2c982e9d9b03ee6121~mv2.png',
  'Tratamiento de adenitis equina, leptospirosis, infecciones respiratorias, enteritis, nefritis, tétanos, artritis, inflamaciones de pene, infecciones secundarias a virosis, infecciones en heridas, flemones, cistitis, pielonefritis, y osteomielitis. - Para Equinos.',
  '',
  'Cada frasco con 18 g de polvo contiene:',
  '',
  ARRAY['equino'],
  'http://www.over.com.ar/product/trifect-forte-3/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tetinas Peach Teats.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_086506b4efe647e5b54f58e81b421691~mv2.png',
  'Las tetinas Peach Teats, están hechas con una fórmula exclusiva, desarrollada para cubrir las necesidades de los guacheros - Son confortables y naturales para el ternero y eliminarán las úlceras en la boca.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Idocarb 12 Zoovet 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e1ae2fb50c974d7d93da8a5a0df3c5f2~mv2.png',
  'Tratamiento y prevención de anaplasmosis y piroplasmosis - Para: Bovinos y Equinos.',
  '100ml.',
  'Imidocarb Dipropionato 12%',
  '',
  ARRAY['bovino', 'equino'],
  'https://www.zoovet.com.ar/es/grandes-animales/item/254-idocarb12',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Guantes largos para examinación Sensy Flex 100u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8e86c685bd7942c189208595ffcff997~mv2.png',
  'Guantes largos descartables para tacto, maniobras obstétricas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ciclar Zoovet 20ml.',
  12642.85,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_16d88530f4444b77b039c38521dd376a~mv2.png',
  'Sincronizador del celo - Para: Bovinos y Ovinos.',
  '20ml.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cable Electroplástico Carreteles Rafaela 7 hilos 500mts.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_47c2e7cefb4e4e2ca1fe739e66b412c9~mv2.png',
  'Cable Electroplástico 7 Hilos.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kobra Spray Curabichera Konig 440ml.',
  4204.6,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b4347005e12c49069d50a076f1302c2d~mv2.png',
  'Curabicheras, Uricida y Antimiásico- Para: Bovinos, Equinos y Ovinos.',
  '440ml.',
  'Cada 100 g de concentrado contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.koniglab.com/producto/kobra/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Revical Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_112dd92e5edb4af5a1787a103c2144bd~mv2.png',
  'Calcificante energético. - Para: Bovinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/revical-3/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilmicovet Zoovet 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ac84b6ce7e5347dcab3b6277b0afe59f~mv2.png',
  'Antibiótico, Antimicrobiano, Macrólido- Para: Bovinos.',
  '100ml.',
  'Tilmicosina 30%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/es/grandes-animales/item/290-tilmicovet',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Triben Calier 2,5l.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2763c927c3fd484eb0d61a150ea3b0c6~mv2.png',
  'Antiparasitario interno oral saguaypicida. - Para: Bovinos.',
  '2,5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.calier.com.ar/wp-content/uploads/2017/11/Triben-Calier-ficha-calier-arg-1.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ubrolexin Boehringer Ingelheim 20 inyectores de 10 ml.',
  103402.9,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bc06d54ad7d44f73a46462463d054a93~mv2.png',
  'Combinación intramamaria sinérgica y de amplio espectro para el tratamiento de las mastitis clínicas - Inyector intramamario estéril. - Para Bovinos.',
  '10 ml.',
  'Cefalexina monohidrato200 mg.',
  '',
  ARRAY['bovino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overxinil Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_66414f8b689d45a7bff601160d06404f~mv2.png',
  'Antiparasitario interno - Tratamiento de infestaciones provocadas por trematodes. Aumenta la capacidad defensiva natural del hígado - Para: Bovinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/overxinil-4/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Powermin ADE Zoovet 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6920fca6504743b49e1a681166fd55c9~mv2.png',
  'Como energizante y fuente de minerales y/o vitaminas. Especial para el crecimiento, lactación y engorde. - Para: Bovinos, Equinos y Ovinos.',
  '500ml.',
  'ATP 0,300 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.zoovet.com.ar/images/Folletos/mineralizantes.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Mamyzin S Boehringer Ingelheim 20 inyectores de 5 ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_721cd890c2a34322b8a4b4ee01446892~mv2.png',
  'Inyector intramamario - Antibiótico intramamario para el secado de las vacas lecheras. - Para Bovinos.',
  '5 ml.',
  'Penetamato yodhidrato 100 mg.',
  '',
  ARRAY['bovino'],
  '&nbsp;',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Suraze Rosenbusch 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rosenbusch' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4330bca7dd99409dafb36b630db8c6e9~mv2.png',
  'Antiparasitario interno de amplio espectro, con poder ovicida, efectivo contra nematodes gastrointestinales y nematodes pulmonares, Tenias (anoplocephalideos) y Trematodes (Fasciola hepática). Actúa sobre Ostertagia inhibida. Destinado a bovinos. - Para: Bovinos.',
  '5l.',
  'Albendazol 10 g.',
  '',
  ARRAY['bovino'],
  'https://www.rosenbusch.com/argentina/gprodfarm_antiparasitarios.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Maxibiotic LA Biogénesis Bago x250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_98094b31a93b41a1b86335ab4a9a703e~mv2.png',
  'Solución antibiótica inyectable de amplio espectro y acción prolongada - Para: Bovinos y Ovinos.',
  '250ml.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.biogenesisbago.com/ar/productos/id79/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'TDF 35 Zoovet 100ml.',
  30166.95,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_14c29bc84872492daf332e1541903c54~mv2.png',
  'Tratamiento y prevención en bovinos de enfermedades respiratorias, queratoconjuntivitis y pododermatitis - Para: Bovinos.',
  '100ml.',
  'Tilmicosina 30%.',
  '',
  ARRAY['bovino'],
  'https://www.zoovet.com.ar/es/grandes-animales/item/288-tdf-35',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Microflud F Vetanco 100ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_91f0723e60d14c45bc22cdda0349411d~mv2.png',
  'El producto es activo contra los gérmenes sensibles al florfenicol - Está indicado para el tratamiento de enfermedades respiratorias, síndrome diarreico y afecciones podales de origen infeccioso - Para Bovinos.',
  '100ml.',
  'Florfenicol 30%',
  '',
  ARRAY['bovino'],
  'https://www.vetanco.com/es/produto/microflud-f/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bactrovet Plata Inyectable Konig 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_fff81e50425c4bc8a0dbdcb0ae68be4b~mv2.png',
  'Endectocida inyectable de amplio espectro y larga persistencia - Parasiticida de amplio espectro y larga persistencia que actúa sobre los parásitos internos y externos de importancia económica - Para: Bovinos.',
  '500ml.',
  'Doramectina: 1 g.',
  '',
  ARRAY['bovino'],
  'http://www.koniglab.com/en/producto/bactrovet-plata-inyectable/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Botón Oficial SENASA Resolución 257 Allflex 25u.',
  3208.75,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_df8e0665044b4445aea48805d28434cc~mv2_d_6667_3751_s_4_2.png',
  'Caravanas oficiales SENASA resolución 257 - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Binomio Oficial SENASA Resolución 257 Allflex 25u.',
  13088.75,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_01cee2fce96f43debcf449db2c79cdb9~mv2_d_6667_3751_s_4_2.png',
  'Caravanas binomio oficial SENASA resolución 257 - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ricoverm Konig x 625ml.',
  38379.55,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c70ad833b691486798a2aa31efb90a2e~mv2.png',
  'Antiparasitario de amplio espectro: adulticida, larvicida y ovicida - No irrita - Máxima biodisponibilidad - Para: Bovinos.',
  '625ml.',
  'Cada 100 mL contiene:',
  '',
  ARRAY['bovino'],
  'http://www.koniglab.com/en/producto/ricoverm/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Maxi Carreteles Rafaela con número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8bf1cae9f7d846c69128289f46eae17a~mv2_d_6668_3752_s_4_2.png;06b954_9d8427fc46ab4a9fb304c9d10b6b8b1e~mv2_d_6668_3752_s_4_2.png;06b954_975ff750e9924815a309b590363ba1ff~mv2_d_6668_3752_s_4_2.png;06b954_f6c6fac9f99145eba1a0099d542f9bdc~mv2_d_6668_3752_s_4_2.png;06b954_7597623f7bab4113b040802f504ba7ff~mv2_d_6668_3752_s_4_2.png;06b954_2ff7bea15ad4463891b30486e2a43ba8~mv2_d_6668_3752_s_4_2.png;06b954_89b0270a4b5f4dc09e41957a5f5e4c7c~mv2_d_6668_3752_s_4_2.png;06b954_34bdb12ca0794ed7adef996107d803c4~mv2_d_6668_3752_s_4_2.png;06b954_1278891ee96846719da7f5f20f9dbfe2~mv2_d_6668_3752_s_4_2.png;06b954_825051215bf7480fb1826916ea4fa160~mv2_d_6668_3752_s_4_2.png;06b954_806711697b78487c896ab0b184a71c54~mv2_d_6668_3752_s_4_2.png;06b954_d9cf1b51a157440ea6079c634d601e1d~mv2_d_6668_3752_s_4_2.png;06b954_1576d77412e24beeab2e094677a21c44~mv2_d_6668_3752_s_4_2.png;06b954_249e2734dd304ed0b5c93b3f98e009bf~mv2_d_6668_3752_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Numeradas - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Maxi Carreteles Rafaela sin número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8bf1cae9f7d846c69128289f46eae17a~mv2_d_6668_3752_s_4_2.png;06b954_155db23591744b44ab8b6f0db6beb28f~mv2_d_6668_3752_s_4_2.png;06b954_975ff750e9924815a309b590363ba1ff~mv2_d_6668_3752_s_4_2.png;06b954_f6c6fac9f99145eba1a0099d542f9bdc~mv2_d_6668_3752_s_4_2.png;06b954_7597623f7bab4113b040802f504ba7ff~mv2_d_6668_3752_s_4_2.png;06b954_2ff7bea15ad4463891b30486e2a43ba8~mv2_d_6668_3752_s_4_2.png;06b954_89b0270a4b5f4dc09e41957a5f5e4c7c~mv2_d_6668_3752_s_4_2.png;06b954_34bdb12ca0794ed7adef996107d803c4~mv2_d_6668_3752_s_4_2.png;06b954_1278891ee96846719da7f5f20f9dbfe2~mv2_d_6668_3752_s_4_2.png;06b954_825051215bf7480fb1826916ea4fa160~mv2_d_6668_3752_s_4_2.png;06b954_806711697b78487c896ab0b184a71c54~mv2_d_6668_3752_s_4_2.png;06b954_d9cf1b51a157440ea6079c634d601e1d~mv2_d_6668_3752_s_4_2.png;06b954_1576d77412e24beeab2e094677a21c44~mv2_d_6668_3752_s_4_2.png;06b954_249e2734dd304ed0b5c93b3f98e009bf~mv2_d_6668_3752_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Sin numerar - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Premium Carreteles Rafaela con número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8e96cfbfa9324ad9a14ee9dbfe1ca190~mv2_d_6668_3752_s_4_2.png;06b954_9d8427fc46ab4a9fb304c9d10b6b8b1e~mv2_d_6668_3752_s_4_2.png;06b954_975ff750e9924815a309b590363ba1ff~mv2_d_6668_3752_s_4_2.png;06b954_f6c6fac9f99145eba1a0099d542f9bdc~mv2_d_6668_3752_s_4_2.png;06b954_7597623f7bab4113b040802f504ba7ff~mv2_d_6668_3752_s_4_2.png;06b954_2ff7bea15ad4463891b30486e2a43ba8~mv2_d_6668_3752_s_4_2.png;06b954_89b0270a4b5f4dc09e41957a5f5e4c7c~mv2_d_6668_3752_s_4_2.png;06b954_34bdb12ca0794ed7adef996107d803c4~mv2_d_6668_3752_s_4_2.png;06b954_1278891ee96846719da7f5f20f9dbfe2~mv2_d_6668_3752_s_4_2.png;06b954_825051215bf7480fb1826916ea4fa160~mv2_d_6668_3752_s_4_2.png;06b954_806711697b78487c896ab0b184a71c54~mv2_d_6668_3752_s_4_2.png;06b954_d9cf1b51a157440ea6079c634d601e1d~mv2_d_6668_3752_s_4_2.png;06b954_1576d77412e24beeab2e094677a21c44~mv2_d_6668_3752_s_4_2.png;06b954_249e2734dd304ed0b5c93b3f98e009bf~mv2_d_6668_3752_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Numeradas - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Premium Carreteles Rafaela sin número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8e96cfbfa9324ad9a14ee9dbfe1ca190~mv2_d_6668_3752_s_4_2.png;06b954_155db23591744b44ab8b6f0db6beb28f~mv2_d_6668_3752_s_4_2.png;06b954_975ff750e9924815a309b590363ba1ff~mv2_d_6668_3752_s_4_2.png;06b954_f6c6fac9f99145eba1a0099d542f9bdc~mv2_d_6668_3752_s_4_2.png;06b954_7597623f7bab4113b040802f504ba7ff~mv2_d_6668_3752_s_4_2.png;06b954_2ff7bea15ad4463891b30486e2a43ba8~mv2_d_6668_3752_s_4_2.png;06b954_89b0270a4b5f4dc09e41957a5f5e4c7c~mv2_d_6668_3752_s_4_2.png;06b954_34bdb12ca0794ed7adef996107d803c4~mv2_d_6668_3752_s_4_2.png;06b954_1278891ee96846719da7f5f20f9dbfe2~mv2_d_6668_3752_s_4_2.png;06b954_825051215bf7480fb1826916ea4fa160~mv2_d_6668_3752_s_4_2.png;06b954_806711697b78487c896ab0b184a71c54~mv2_d_6668_3752_s_4_2.png;06b954_d9cf1b51a157440ea6079c634d601e1d~mv2_d_6668_3752_s_4_2.png;06b954_1576d77412e24beeab2e094677a21c44~mv2_d_6668_3752_s_4_2.png;06b954_249e2734dd304ed0b5c93b3f98e009bf~mv2_d_6668_3752_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Sin numerar - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Grande Carreteles Rafaela con número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_85f37421a7934957a348b6759048768f~mv2_d_6668_3752_s_4_2.png;06b954_9d8427fc46ab4a9fb304c9d10b6b8b1e~mv2_d_6668_3752_s_4_2.png;06b954_975ff750e9924815a309b590363ba1ff~mv2_d_6668_3752_s_4_2.png;06b954_f6c6fac9f99145eba1a0099d542f9bdc~mv2_d_6668_3752_s_4_2.png;06b954_7597623f7bab4113b040802f504ba7ff~mv2_d_6668_3752_s_4_2.png;06b954_2ff7bea15ad4463891b30486e2a43ba8~mv2_d_6668_3752_s_4_2.png;06b954_89b0270a4b5f4dc09e41957a5f5e4c7c~mv2_d_6668_3752_s_4_2.png;06b954_34bdb12ca0794ed7adef996107d803c4~mv2_d_6668_3752_s_4_2.png;06b954_1278891ee96846719da7f5f20f9dbfe2~mv2_d_6668_3752_s_4_2.png;06b954_825051215bf7480fb1826916ea4fa160~mv2_d_6668_3752_s_4_2.png;06b954_806711697b78487c896ab0b184a71c54~mv2_d_6668_3752_s_4_2.png;06b954_d9cf1b51a157440ea6079c634d601e1d~mv2_d_6668_3752_s_4_2.png;06b954_1576d77412e24beeab2e094677a21c44~mv2_d_6668_3752_s_4_2.png;06b954_249e2734dd304ed0b5c93b3f98e009bf~mv2_d_6668_3752_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Numeradas - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Grande Carreteles Rafaela sin número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_85f37421a7934957a348b6759048768f~mv2_d_6668_3752_s_4_2.png;06b954_155db23591744b44ab8b6f0db6beb28f~mv2_d_6668_3752_s_4_2.png;06b954_975ff750e9924815a309b590363ba1ff~mv2_d_6668_3752_s_4_2.png;06b954_f6c6fac9f99145eba1a0099d542f9bdc~mv2_d_6668_3752_s_4_2.png;06b954_7597623f7bab4113b040802f504ba7ff~mv2_d_6668_3752_s_4_2.png;06b954_2ff7bea15ad4463891b30486e2a43ba8~mv2_d_6668_3752_s_4_2.png;06b954_89b0270a4b5f4dc09e41957a5f5e4c7c~mv2_d_6668_3752_s_4_2.png;06b954_34bdb12ca0794ed7adef996107d803c4~mv2_d_6668_3752_s_4_2.png;06b954_1278891ee96846719da7f5f20f9dbfe2~mv2_d_6668_3752_s_4_2.png;06b954_825051215bf7480fb1826916ea4fa160~mv2_d_6668_3752_s_4_2.png;06b954_806711697b78487c896ab0b184a71c54~mv2_d_6668_3752_s_4_2.png;06b954_d9cf1b51a157440ea6079c634d601e1d~mv2_d_6668_3752_s_4_2.png;06b954_1576d77412e24beeab2e094677a21c44~mv2_d_6668_3752_s_4_2.png;06b954_249e2734dd304ed0b5c93b3f98e009bf~mv2_d_6668_3752_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Sin numerar - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Chica Carreteles Rafaela con número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_352744a346a04d0983a747fad076ad64~mv2_d_6668_3752_s_4_2.png;06b954_9d8427fc46ab4a9fb304c9d10b6b8b1e~mv2_d_6668_3752_s_4_2.png;06b954_975ff750e9924815a309b590363ba1ff~mv2_d_6668_3752_s_4_2.png;06b954_f6c6fac9f99145eba1a0099d542f9bdc~mv2_d_6668_3752_s_4_2.png;06b954_7597623f7bab4113b040802f504ba7ff~mv2_d_6668_3752_s_4_2.png;06b954_2ff7bea15ad4463891b30486e2a43ba8~mv2_d_6668_3752_s_4_2.png;06b954_89b0270a4b5f4dc09e41957a5f5e4c7c~mv2_d_6668_3752_s_4_2.png;06b954_34bdb12ca0794ed7adef996107d803c4~mv2_d_6668_3752_s_4_2.png;06b954_1278891ee96846719da7f5f20f9dbfe2~mv2_d_6668_3752_s_4_2.png;06b954_825051215bf7480fb1826916ea4fa160~mv2_d_6668_3752_s_4_2.png;06b954_806711697b78487c896ab0b184a71c54~mv2_d_6668_3752_s_4_2.png;06b954_d9cf1b51a157440ea6079c634d601e1d~mv2_d_6668_3752_s_4_2.png;06b954_1576d77412e24beeab2e094677a21c44~mv2_d_6668_3752_s_4_2.png;06b954_249e2734dd304ed0b5c93b3f98e009bf~mv2_d_6668_3752_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Numeradas - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Binomio Oficial SENASA Resolución 257 Carreteles Rafaela 25u.',
  8536.25,
  NULL,
  'https://static.wixstatic.com/media/06b954_01cee2fce96f43debcf449db2c79cdb9~mv2_d_6667_3751_s_4_2.png',
  'Caravanas binomio oficial SENASA resolución 257 - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Botón Oficial SENASA Resolución 257 Carreteles Rafaela 25u.',
  2562.5,
  NULL,
  'https://static.wixstatic.com/media/06b954_df8e0665044b4445aea48805d28434cc~mv2_d_6667_3751_s_4_2.png',
  'Caravanas oficiales SENASA resolución 257 - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Chica Carreteles Rafaela sin número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_352744a346a04d0983a747fad076ad64~mv2_d_6668_3752_s_4_2.png;06b954_155db23591744b44ab8b6f0db6beb28f~mv2_d_6668_3752_s_4_2.png;06b954_975ff750e9924815a309b590363ba1ff~mv2_d_6668_3752_s_4_2.png;06b954_f6c6fac9f99145eba1a0099d542f9bdc~mv2_d_6668_3752_s_4_2.png;06b954_7597623f7bab4113b040802f504ba7ff~mv2_d_6668_3752_s_4_2.png;06b954_2ff7bea15ad4463891b30486e2a43ba8~mv2_d_6668_3752_s_4_2.png;06b954_89b0270a4b5f4dc09e41957a5f5e4c7c~mv2_d_6668_3752_s_4_2.png;06b954_34bdb12ca0794ed7adef996107d803c4~mv2_d_6668_3752_s_4_2.png;06b954_1278891ee96846719da7f5f20f9dbfe2~mv2_d_6668_3752_s_4_2.png;06b954_825051215bf7480fb1826916ea4fa160~mv2_d_6668_3752_s_4_2.png;06b954_806711697b78487c896ab0b184a71c54~mv2_d_6668_3752_s_4_2.png;06b954_d9cf1b51a157440ea6079c634d601e1d~mv2_d_6668_3752_s_4_2.png;06b954_1576d77412e24beeab2e094677a21c44~mv2_d_6668_3752_s_4_2.png;06b954_249e2734dd304ed0b5c93b3f98e009bf~mv2_d_6668_3752_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Sin numerar - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Chica Carreteles Rafaela con número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_23bb1944ae244cf39e2637bf863680c4~mv2_d_1950_1950_s_2.png;06b954_91f67064702c40a490b5a0b35d8ab945~mv2_d_1950_1950_s_2.png;06b954_717238b684a5426c84a1d0d36bdd2463~mv2_d_1950_1949_s_2.png;06b954_862b2831aca147969dcc37777e757617~mv2_d_1950_1950_s_2.png;06b954_a9265801c7784e1685003f7151a06b5d~mv2_d_1950_1950_s_2.png;06b954_2f99f718e3054d6fb91f1abedf916a8f~mv2_d_1950_1950_s_2.png;06b954_13d54f35313640d1b458f5f145299225~mv2_d_1950_1950_s_2.png;06b954_881c2a30742e4129b4a638c2c29c196a~mv2_d_1950_1950_s_2.png;06b954_ebaaefe40e5d430ba804d91f222b863f~mv2_d_1950_1950_s_2.png;06b954_b6ea78716a45436994e4a67fab8301e5~mv2_d_1950_1950_s_2.png;06b954_5ff225fc3bf2477ea5ab53ce27e4aa5a~mv2_d_1950_1949_s_2.png;06b954_af5d807238d14d828ed74a2a3aa15fea~mv2_d_1950_1950_s_2.png;06b954_9e24f2dcdc14420599cb6e9573e5b006~mv2_d_1950_1949_s_2.png;06b954_8b0068fb16c44e30be3ff0c7e42d83cf~mv2_d_1950_1950_s_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Numeradas - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Grande Carreteles Rafaela con número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_357ea9c377c145a3b2c6a7cfba640134~mv2_d_1950_1949_s_2.png;06b954_91f67064702c40a490b5a0b35d8ab945~mv2_d_1950_1950_s_2.png;06b954_717238b684a5426c84a1d0d36bdd2463~mv2_d_1950_1949_s_2.png;06b954_862b2831aca147969dcc37777e757617~mv2_d_1950_1950_s_2.png;06b954_a9265801c7784e1685003f7151a06b5d~mv2_d_1950_1950_s_2.png;06b954_2f99f718e3054d6fb91f1abedf916a8f~mv2_d_1950_1950_s_2.png;06b954_13d54f35313640d1b458f5f145299225~mv2_d_1950_1950_s_2.png;06b954_881c2a30742e4129b4a638c2c29c196a~mv2_d_1950_1950_s_2.png;06b954_ebaaefe40e5d430ba804d91f222b863f~mv2_d_1950_1950_s_2.png;06b954_b6ea78716a45436994e4a67fab8301e5~mv2_d_1950_1950_s_2.png;06b954_5ff225fc3bf2477ea5ab53ce27e4aa5a~mv2_d_1950_1949_s_2.png;06b954_af5d807238d14d828ed74a2a3aa15fea~mv2_d_1950_1950_s_2.png;06b954_9e24f2dcdc14420599cb6e9573e5b006~mv2_d_1950_1949_s_2.png;06b954_8b0068fb16c44e30be3ff0c7e42d83cf~mv2_d_1950_1950_s_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Numeradas - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Premium Carreteles Rafaela con número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_e371f17cddee4e359d688580cf11950a~mv2_d_1950_1949_s_2.png;06b954_91f67064702c40a490b5a0b35d8ab945~mv2_d_1950_1950_s_2.png;06b954_717238b684a5426c84a1d0d36bdd2463~mv2_d_1950_1949_s_2.png;06b954_862b2831aca147969dcc37777e757617~mv2_d_1950_1950_s_2.png;06b954_a9265801c7784e1685003f7151a06b5d~mv2_d_1950_1950_s_2.png;06b954_2f99f718e3054d6fb91f1abedf916a8f~mv2_d_1950_1950_s_2.png;06b954_13d54f35313640d1b458f5f145299225~mv2_d_1950_1950_s_2.png;06b954_881c2a30742e4129b4a638c2c29c196a~mv2_d_1950_1950_s_2.png;06b954_ebaaefe40e5d430ba804d91f222b863f~mv2_d_1950_1950_s_2.png;06b954_b6ea78716a45436994e4a67fab8301e5~mv2_d_1950_1950_s_2.png;06b954_5ff225fc3bf2477ea5ab53ce27e4aa5a~mv2_d_1950_1949_s_2.png;06b954_af5d807238d14d828ed74a2a3aa15fea~mv2_d_1950_1950_s_2.png;06b954_9e24f2dcdc14420599cb6e9573e5b006~mv2_d_1950_1949_s_2.png;06b954_8b0068fb16c44e30be3ff0c7e42d83cf~mv2_d_1950_1950_s_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Numeradas - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Maxi Carreteles Rafaela sin número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2ef6b85a1ce54b29803ab30a88fa64ab~mv2_d_1950_1950_s_2.png;06b954_42b671fa74ee46b7b5c22f999002c6ce~mv2_d_1950_1950_s_2.png;06b954_717238b684a5426c84a1d0d36bdd2463~mv2_d_1950_1949_s_2.png;06b954_862b2831aca147969dcc37777e757617~mv2_d_1950_1950_s_2.png;06b954_a9265801c7784e1685003f7151a06b5d~mv2_d_1950_1950_s_2.png;06b954_2f99f718e3054d6fb91f1abedf916a8f~mv2_d_1950_1950_s_2.png;06b954_13d54f35313640d1b458f5f145299225~mv2_d_1950_1950_s_2.png;06b954_881c2a30742e4129b4a638c2c29c196a~mv2_d_1950_1950_s_2.png;06b954_ebaaefe40e5d430ba804d91f222b863f~mv2_d_1950_1950_s_2.png;06b954_b6ea78716a45436994e4a67fab8301e5~mv2_d_1950_1950_s_2.png;06b954_5ff225fc3bf2477ea5ab53ce27e4aa5a~mv2_d_1950_1949_s_2.png;06b954_af5d807238d14d828ed74a2a3aa15fea~mv2_d_1950_1950_s_2.png;06b954_9e24f2dcdc14420599cb6e9573e5b006~mv2_d_1950_1949_s_2.png;06b954_8b0068fb16c44e30be3ff0c7e42d83cf~mv2_d_1950_1950_s_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Sin numerar- Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Grande Carreteles Rafaela sin número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_357ea9c377c145a3b2c6a7cfba640134~mv2_d_1950_1949_s_2.png;06b954_42b671fa74ee46b7b5c22f999002c6ce~mv2_d_1950_1950_s_2.png;06b954_717238b684a5426c84a1d0d36bdd2463~mv2_d_1950_1949_s_2.png;06b954_862b2831aca147969dcc37777e757617~mv2_d_1950_1950_s_2.png;06b954_a9265801c7784e1685003f7151a06b5d~mv2_d_1950_1950_s_2.png;06b954_2f99f718e3054d6fb91f1abedf916a8f~mv2_d_1950_1950_s_2.png;06b954_13d54f35313640d1b458f5f145299225~mv2_d_1950_1950_s_2.png;06b954_881c2a30742e4129b4a638c2c29c196a~mv2_d_1950_1950_s_2.png;06b954_ebaaefe40e5d430ba804d91f222b863f~mv2_d_1950_1950_s_2.png;06b954_b6ea78716a45436994e4a67fab8301e5~mv2_d_1950_1950_s_2.png;06b954_5ff225fc3bf2477ea5ab53ce27e4aa5a~mv2_d_1950_1949_s_2.png;06b954_af5d807238d14d828ed74a2a3aa15fea~mv2_d_1950_1950_s_2.png;06b954_9e24f2dcdc14420599cb6e9573e5b006~mv2_d_1950_1949_s_2.png;06b954_8b0068fb16c44e30be3ff0c7e42d83cf~mv2_d_1950_1950_s_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Sin Numerar - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Premium Carreteles Rafaela sin número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_e371f17cddee4e359d688580cf11950a~mv2_d_1950_1949_s_2.png;06b954_42b671fa74ee46b7b5c22f999002c6ce~mv2_d_1950_1950_s_2.png;06b954_717238b684a5426c84a1d0d36bdd2463~mv2_d_1950_1949_s_2.png;06b954_862b2831aca147969dcc37777e757617~mv2_d_1950_1950_s_2.png;06b954_a9265801c7784e1685003f7151a06b5d~mv2_d_1950_1950_s_2.png;06b954_2f99f718e3054d6fb91f1abedf916a8f~mv2_d_1950_1950_s_2.png;06b954_13d54f35313640d1b458f5f145299225~mv2_d_1950_1950_s_2.png;06b954_881c2a30742e4129b4a638c2c29c196a~mv2_d_1950_1950_s_2.png;06b954_ebaaefe40e5d430ba804d91f222b863f~mv2_d_1950_1950_s_2.png;06b954_b6ea78716a45436994e4a67fab8301e5~mv2_d_1950_1950_s_2.png;06b954_5ff225fc3bf2477ea5ab53ce27e4aa5a~mv2_d_1950_1949_s_2.png;06b954_af5d807238d14d828ed74a2a3aa15fea~mv2_d_1950_1950_s_2.png;06b954_9e24f2dcdc14420599cb6e9573e5b006~mv2_d_1950_1949_s_2.png;06b954_8b0068fb16c44e30be3ff0c7e42d83cf~mv2_d_1950_1950_s_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Sin Numerar - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Maxi Carreteles Rafaela con número 25u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2ef6b85a1ce54b29803ab30a88fa64ab~mv2_d_1950_1950_s_2.png;06b954_91f67064702c40a490b5a0b35d8ab945~mv2_d_1950_1950_s_2.png;06b954_717238b684a5426c84a1d0d36bdd2463~mv2_d_1950_1949_s_2.png;06b954_862b2831aca147969dcc37777e757617~mv2_d_1950_1950_s_2.png;06b954_a9265801c7784e1685003f7151a06b5d~mv2_d_1950_1950_s_2.png;06b954_2f99f718e3054d6fb91f1abedf916a8f~mv2_d_1950_1950_s_2.png;06b954_13d54f35313640d1b458f5f145299225~mv2_d_1950_1950_s_2.png;06b954_881c2a30742e4129b4a638c2c29c196a~mv2_d_1950_1950_s_2.png;06b954_ebaaefe40e5d430ba804d91f222b863f~mv2_d_1950_1950_s_2.png;06b954_b6ea78716a45436994e4a67fab8301e5~mv2_d_1950_1950_s_2.png;06b954_5ff225fc3bf2477ea5ab53ce27e4aa5a~mv2_d_1950_1949_s_2.png;06b954_af5d807238d14d828ed74a2a3aa15fea~mv2_d_1950_1950_s_2.png;06b954_9e24f2dcdc14420599cb6e9573e5b006~mv2_d_1950_1949_s_2.png;06b954_8b0068fb16c44e30be3ff0c7e42d83cf~mv2_d_1950_1950_s_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Numeradas - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit Reproductivo Full Zoovet 50 dispositivos.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6bdaf5facbb1469b9d1b46f49544eab1~mv2.png',
  'Presentación comercial que contiene todos los elementos necesarios para la ejecución de los protocolos de IATF clásicos en hembras bovinas. - Para: Bovinos.',
  '50 dispositivos.',
  '',
  '',
  ARRAY['bovino'],
  'https://www.mercosur.com/media/filer_public/2c/e0/2ce00082-0e12-49ad-aca9-e1a02346bf43/grandes20animales.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'MAS D3 Zoovet 100 jeringas de 10 ml.',
  264050,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8d072198d9424a47adb05b64d7e0023f~mv2.png',
  'Tratamiento de mastitis producidas por microorganismos sensibles a la Espira-micina adipato, Gentamicina base, durante la lactancia en bovinos. Con un nuevo concepto de inmunoestimulación local por el aporte vitamínico. - Para Bovinos.',
  '10 ml.',
  'Cada inyector contiene de 10 ml:',
  '',
  ARRAY['bovino'],
  'https://www.mercosur.com/media/filer_public/2c/e0/2ce00082-0e12-49ad-aca9-e1a02346bf43/grandes20animales.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aguja Aplicador de Caravanas Allflex',
  7996.8,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_af6738c4f64e47c3b16f12c632f8e175~mv2.png',
  'Aguja para Aplicador de Caravanas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit Dispocel Von Franken 100 dispositivos.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_02217a61de8b49448d2559c2bb65c134~mv2.png',
  'Control del ciclo estral en vaquillonas y vacas para Inseminación a Tiempo Fijo o a celo detectado - Tratamiento del anestro post-parto - Acortamiento del período parto concepción - Para: Bovinos.',
  '100 dispositivos.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.fatrovonfranken.com/Productos/Grandes-Animales_Hormonales/Dispocel-Monouso',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Entero Plus Capsulas Zoovet x100u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1ff2ad48b3bb42c7b2b55768e1c5fd61~mv2.png',
  'Bacteriostático intestinal - Se trata de una formulación antimicrobiana de amplio espectro asociada a un adsorbente gastrointestinal. Se indica para el tratamiento de enteritis, gastroenteritis y diarreas inespecíficas- Para: Bovinos.',
  '',
  'Cada cápsula contiene:',
  '',
  ARRAY['bovino'],
  'https://www.mercosur.com/media/filer_public/2c/e0/2ce00082-0e12-49ad-aca9-e1a02346bf43/grandes20animales.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilmicofull Spray Zoovet 200ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoovet' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9952a003832545f9817daacd04090f13~mv2.png',
  'Tratamiento de la queratoconjuntivitis infecciosa - Antimicrobiano, Antiflamatorio - Para: Bovinos.',
  '200ml.',
  'Tilmicosina 2,5 g.',
  '',
  ARRAY['bovino'],
  'https://www.mercosur.com/media/filer_public/2c/e0/2ce00082-0e12-49ad-aca9-e1a02346bf43/grandes20animales.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Torniquete N°8 Golondrina.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_233596603f264d41873975b09256e6f1~mv2.png',
  'Tanto la calidad de sus materiales, su construcción y su recubrimiento protector, garantizan en el torniquete resistencia y una vida útil prolongada.',
  '8 G',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overmectina Duplex Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1fab2513cbdf44c78246a4ac77655ab8~mv2.png',
  'Endectocida inyectable, destinado al tratamiento y control de parasitosis externas e internas - Antiparasitario interno y externo de amplio espectro - Para: Bovinos y Ovinos.',
  '500ml.',
  'Levamisol clorhidrato 20 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.over.com.ar/product/overmectina-duplex-4/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilmic Mivet 100ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_87c4f4d6a0eb465eb15616031855017f~mv2.png',
  'Antibiotico Inyectable de amplio espectro - Indicado en el tratamiento de Enfermedades u otros cuadros infecciosos causados por gérmenes sensibles a la Tilmicosina. - Para Bovinos.',
  '100ml.',
  'Cada 100 mL contiene:',
  '',
  ARRAY['bovino'],
  'http://www.laboratoriosmicrosules.com/producto/tilmic/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Carretel Vacío Carreteles Rafaela.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_d7995f1b4c29446db2a58737c589ad82~mv2.png',
  'Carretel vacío',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Fosfamisol Biogenesis Bago 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_950de1330cdf45b4af45d7b64d0050ea~mv2.png',
  'Antiparasitario interno inyectable de amplio espectro para bovinos - Para: Bovinos.',
  '500ml.',
  'Fosfato de L-tetramisol, 22,3 g',
  '',
  ARRAY['bovino'],
  'http://www.biogenesisbago.com/sv/productos/id293/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kuramicina L.A. Konig 250ml.',
  18007.9,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b878b276b62e4b7eb80ea99dc0f9c1e9~mv2.png',
  'Antibiótico inyectable de acción inmediata y prolongada. - Para Bovinos y Ovinos.',
  '250ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.koniglab.com/producto/kuramicina-l-a/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Distrepbencil E-T Novartis x 25 ampollas.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_de1456a65ff843db8a925b908398de86~mv2.png',
  'Distrepbencil E-T es una combinación de tres tipos de penicilina, eficaz contra una amplia variedad de bacterias gram-positivas y gram-negativas - Para Bovinos, Equinos y Ovinos.',
  '',
  'Penicilina G benzatínica: 2.500.000 UI.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Batoxil L.A. Richmond 500ml.',
  29800,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c694b14e5c5447368297683c5c17b2fe~mv2.png',
  'Antibiótico de amplio espectro y acción prolongada - Es una solución inyectable estéril de Oxitetraciclina - Antimicrobiano Bacteriostático, formulado especialmente con agentes y vehículos que le confieren a su formulación un efecto prolongado - Logra concentraciones óptimas en fluidos corporales, suero y exudados - Para Bovinos y Ovinos.',
  '500ml.',
  'Oxitetraciclina base: 20 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=2&amp;id=11&amp;pg=1',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Revimin Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2965c93df2a1419f955b8f267626612e~mv2.png',
  'Formulación completa de vitaminas y minerales destinada a prevenir y corregir la carencia de los mismos - Para: Bovinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.over.com.ar/product/revimin/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aceite Curativo MSD 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a93ebffede4149758f784e596ba2cf48~mv2.png',
  'Antiséptico, Calmante, Cicatrizante y Repelente de uso externo - Para: Bovinos, Ovinos y Equinos.',
  '500ml.',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.msd-salud-animal.com.ar/products/aceite-curativo/product-aceite-curativo.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Coagulamax DUO Over 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_566648c2617c40ebba31368e781e1ac9~mv2.png',
  'Coagulante - Prevención y tratamiento de hemorragias de etiología y localización diversa - Para Bovinos, Equinos y Ovinos.',
  '50ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/coagulamax-duo/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tetraciclina C InmunoVet 100 capsulas.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f0c2bc11616456f8492f9189333dd3a~mv2_d_4896_3264_s_4_2.png',
  'Antibiótico vitaminado de amplio espectro - Para: Bovinos y Equinos.',
  '',
  'Sulfametoxazol.',
  '',
  ARRAY['bovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Romagel Lactancia Boehringer 160 Jeringas.',
  699502.95,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2649542d08924436b7fbbdf914b46b8f~mv2.png',
  'Tratamientode mastitis clínicas y subclínicas en vacas en lactanciay vaquillonas, causadas por bacterias sensibles,incluídas las que producen beta-lactamasas. - Solución Inyectable - Para Bovinos.',
  '',
  'Lincomicina 330 mg (como clorhidrato).',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Dairy/Products/Pages/ROMAGEL%C2%AE.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Varilla de Hierro con Rulo x 8mm.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_c9fc5d8dc2864b91b3ab43ad673d5531~mv2.png',
  'De hierro aleteado, la varilla de hierro con rulo es ideal para suelos duros.La horquilla y su vara superior, facilitan su colocación.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Varilla de Hierro con Rulo x 10mm.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_b421c816a8b9438e80dc5fba3b0f1ca3~mv2.png',
  'De hierro aleteado, la varilla de hierro con rulo es ideal para suelos duros.La horquilla y su vara superior, facilitan su colocación.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Varilla de Hierro con Doble Rulo x 10mm.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_336cd3a43c2c405490f5ad196af3f901~mv2.png',
  'De hierro aleteado, la varilla de hierro con rulo es ideal para suelos duros.La horquilla y su vara superior, facilitan su colocación.El doble rulo le confiere mayor funcionalidad al contar con mayor espacio para pasar cables.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Varilla Plastica c/alma de Acero.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_c995d76883dc4e979128e9a61231bad1~mv2.png',
  'La varilla con alma de acero galvanizado posee un cuerpo exterior de plástico estabilizado con UV para una aislación eficaz.Además. Su para robusta cuenta con dos puntas de acero que facilita su colocación.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Torniquete con Aislador.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_762d192129524a37816da093875bb3fa~mv2.png',
  'Tanto la calidad de sus materiales, su construcción y su recubrimiento protector, garantizan en el torniquete resistencia y una vida útil prolongada.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Torniquete N°6 Golondrina.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_07548543badb492594d3165d943fc65f~mv2.png',
  'Tanto la calidad de sus materiales, su construcción y su recubrimiento protector, garantizan en el torniquete resistencia y una vida útil prolongada.',
  '6 G',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Manija Premium.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2a78d7e50f144e3892b0f0ef7c9fd922~mv2.png',
  'Inyectada en polietileno con inhibidor UV, la manija premium posee un resorte y gancho en acero galvanizado que permiten un enganche seguro.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Manija Importada.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_7a5947174aa44b4ca58259742064d63b~mv2.png',
  'La manija negro garantiza un agarre firme, y tanto su cobertura de caucho reforzado como el tubo interior semi-rígido de vinilo, proporcionan una capa adicional de aislamiento.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Manija Importada.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_0d74ab3ab8ab49c38ae582229b315862~mv2.png',
  'Manija con una cobertura de vinilo, la manija asegura un efecto aislante.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Manija Plastica de Compresion Full.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_7bc7fd917cef41a593b5a3d4b6467431~mv2.png',
  'Para instalar pasos o puertas de cerco eléctrico y permitir una fácil apertura y cierre. - Gancho en acero galvanizado - Más robusta, más resistente, más aislación- Inyectado en polietileno con protección UV.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Manija Nacional.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_957b0705b0ec482e8c1f423fa847080b~mv2.png',
  'La manija negra garantiza un agarre firme, y tanto su cobertura de caucho reforzado como el tubo interior semi-rígido de vinilo, proporcionan una capa adicional de aislamiento.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Mango Aislante.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_032e31d560c44a5c9ddc1166fcb255b9~mv2.png',
  'Mango Aislante inyectado en polietileno con inhibidor UV, el diseño ergonómico de este asegura el enganche y facilita la extracción.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Llave de Corte.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_3714ab1a05ca4afb9fed9dfdc115fb76~mv2.png',
  'Llave de corte inyectada en polipropileno con aditivo UV, sus contactos firmes y seguros en acero inoxidable garantizan en la llave de corte confiabilidad a lo largo del tiempo.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aislador Campanita de Porcelana Importado.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_b2695e0692054e2093a80f9ad194e6ce~mv2.png',
  'Aislador fabricado con porcelana resistente, los aisladores campanita de porcelana están recubiertos además de un barniz protector.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aislador Carretel de Porcelana Importado.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_45047b4328bf477db0273b1c1cc45b42~mv2.png',
  'Aislador fabricado con porcelana resistente, los aisladores carreteles de porcelana están recubiertos además de un barniz protector.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aislador Esquinero de Porcelana Importado.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_ffc4c60b6ab24fd69d92882c93519f94~mv2.png',
  'Aislador fabricado con porcelana resistente, los aisladores esquineros de porcelana están recubiertos además de un barniz protector.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aislador Esquinero de Porcelana c/agujeros Importado.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_67455bb6accf4463b7e461369d9c90a6~mv2.png',
  'Aislador fabricado con porcelana resistente, los aisladores esquineros de porcelana están recubiertos además de un barniz protector.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aislador Roldana x unidad.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_5fb69d3e0ed546db92e3d038ded2ebfe~mv2.png',
  'Aislador inyectado en polietileno con inhibidor UV, el aislador Roldana posee un orificio amplio que permite que el alambre se deslice aun con empalmes.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aislador Campanita x 100u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_1a5ca9d254fa41c1850aaab8ea5a1601~mv2.png',
  'Aislador inyectado en polietileno con inhibidor UV, el Aislador Campanita es de uso conveniente en casos de tensiones largas de la cerca.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aislador Esquinero x unidad.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_6381b8f41fd7421ebd0f0b322f3cb2c5~mv2.png',
  'Aislador inyectado en polietileno con inhibidor UV, el aislador esquinero asegura la tensión del centro del aislador al atar.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aislador Esquinero Maxi Rienda x unidad.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_561066cf1fec4bb38104af88edab8213~mv2.png',
  'Aislador inyectado en polietileno con inhibidor UV, el aislador esquinero asegura la tensión del centro del aislador al atar.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ememast Plus Lactancia Boehringer 160 Jeringas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e00c8ee283a54858961d28f1224f9bf8~mv2.png',
  'Tratamiento curativo de la Mastitis subclínica y clínica(agudas y crónicas) de vacas lecheras durante lalactancia, causadas por gérmenes sensibles a laespiramicina y a la neomicina - Solución Inyectable - Para Bovinos.',
  '',
  'Flumetasona 0,0025 g.',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Dairy/Products/Pages/EMEMAST-PLUS-%C2%AE.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tuberculina Providean Tecnovax 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_346a9f598be44000b67e6675e299b2f7~mv2.png;06b954_43bf9a182200493998be783f805417b6~mv2.png',
  'Derivado proteico purificado, inyectable - Para el tratamiento de la tuberculosis bovina - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/ppd-3000-tuberculina-bovina/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overline Large Duo Over 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7f4f615af3fe40ac8cbaf5dabea55e75~mv2.png',
  'Antiparasitario externo Pour-on - Antiparasitario interno y externo pour on para uso en bovinos - Para: Bovinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/overline-large-duo/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador Solar 40km Mandinga B120 con Bateria.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_d5afeaa9c16d40ed8a19c3e4421883e5~mv2.png;06b954_06c9ea5ce9194bce9b5d9e29539363bb~mv2.png',
  'Energizador de Alambrados Mandinga B120 - Funciona a energía solar.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador Solar 20km Mandinga B60 con Bateria.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8cf28171174944d7b3394c3582b4b3d5~mv2.png;06b954_06c9ea5ce9194bce9b5d9e29539363bb~mv2.png',
  'Energizador de Alambrados Mandinga B60 - Funciona a energía solar.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador 220 V 200km Mandinga C1200.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_578701b04eaa444cb700831467841ada~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga C1200 - Desde pequeñas superficies hasta más de 1000 has electrificadas en forma segura. Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador 220V 40km Mandinga C120.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_d36b7d596cd64b83867cf19478f1af58~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga C120 - Desde pequeñas superficies hasta 600 has electrificadas en forma segura. Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador a Batería 12V 200km Mandinga B1200.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_b782ba68c81c4e51ba8df426273c5a47~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga B1200 - Desde pequeñas superficies hasta más de 1000 has electrificadas en forma segura. Funciona a 12-36 V. - No incluye batería.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Selcozinc Biotay 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biotay' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_74c3d77096344299b4d76869cd4764f1~mv2.png',
  'Complejo vitamínico mineral inyectable - Para prevenir carencias de Selenio, Cobre y Zinc - Para: Bovinos.',
  '500ml.',
  'Cada ml contiene:',
  '',
  ARRAY['bovino'],
  'http://biotay.com/productos/selcozinc/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overtak Full Over 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4233d39c3ac6494eb493f5179665eb77~mv2.png',
  'Antiparasitario externo Pour-on - Antiparasitario interno y externo pour on para uso en bovinos - Inhibidor del desarrollo de las garrapatas de los bovinos - Para: Bovinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/overtak-full/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Revervac Hemoglobinuria Biogenesis Bago 80 dosis 240ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4cf677e5f3b4479ca128cd7af3713e29~mv2.png',
  'Vacuna para la prevención de la Hemoglobinuria Bacilar en bovinos - Para: Bovinos.',
  '80 dosis 240',
  '',
  '',
  ARRAY['bovino'],
  'http://www.biogenesisbago.com/ar/productos/id5/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Povizur 10 Weizur 1Lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Weizur' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_89fe0e0d796b46938b481cf5be9b9447~mv2.png',
  'Antiséptico y desinfectante - Para Bovinos, Equinos y Ovinos.',
  '1Lt.',
  'Iodopovidona 10%.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://www.weizur.com/producto.php?p=21',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Yoduro de Sodio al 60% Von Franken 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a271982b51f74213b7712cd8f277cbeb~mv2.png',
  'Solución quimioterápica inyectable a base de Yoduro de sodio - Para: Bovinos.',
  '50ml.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.fatrovonfranken.com/Productos/Grandes-Animales_Especificos/Yoduro-De-Sodio-Al-60',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dovenix Supra Boehringer x 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bb50e0faae194e58a230dbc2c4f9c2cf~mv2.png',
  'Dovenix contiene nitroxinil, que es un antiparasitario del grupo de los fenoles sustituidos que actúa interfiriendo el metabolismo energético del parásito, produciéndose así su muerte - Actúa a nivel de la fosforilación oxidativa - Para: Bovinos y Ovinos.',
  '500ml.',
  '.',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Intrasil Sellador Boehringer 20 Jeringas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7c6325461d5e475ab168e22af3ab203c~mv2.png',
  'Sello interno - Pasta de aplicación intramamaria, destinada a vacas en secado - Para Bovinos.',
  '',
  'Bismuto, subnitrato60 g.',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Suanovil MSD 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_346e97a6d34541829b51235d141346d2~mv2.png',
  'Es la asociación de 2 antibióticos complementarios y sinérgicos, la espiramicina y la estreptomicina, listo para preparar una solución inyectable en proporciones que le permiten alcanzar, a las dosis indicadas, altos niveles terapéuticos de ambos antibióticos - Actividad antibiótica: La espiramicina posee efectiva actividad bactericida y bacteriostática sobre gérmenes Gram positivos, Estreptococos, Estáfilococos, Enterococos, Neumococos, Clostridios, Corinebacterias, Erisipelotrix, etc, como así también sobre Micoplasmas (PPLO), Toxoplasmas, Leptospiras, Anaplasmas, Ricketsias, Amebas y ciertos Coccidios - La estreptomicina por su parte es particularmente activa contra microorganismos Gram negativos, Vibrios, Brucellas, Pasteurellas, Leptospiras, Colibacilos, Corinebacterias, Listeria monocitogenes y otros - Distribución en el organismo: Una vez administrado el Suanovil®, se difunde por todo el organismo (excepto S.N.C.) alcanzando en corto tiempo elevados niveles terapéuticos de ambos antibióticos en sangre y tejidos - La espiramicina en particular es fijada en forma selectiva y perdurable a nivel celular, lo que asegura una actividad prolongada a nivel del foco infeccioso - Las mayores concentraciones tisulares se alcanzan en pulmón, riñón, hígado, bazo, hueso y piel, tejidos en los que la concentración terapéutica es superior a casi todos los antibióticos - Es particularmente destacable la concentración alcanzada en tejidos glandulares que captan activamente la espiramicina incorporándola a su producto de secreción, tal es el caso de las glándulas mamarias, salivales y lagrimales - Asimismo se produce pasaje al tracto intestinal a través de las secreciones biliar y pancreática, realizando ciclo entero hepático - Es reducida, en cambio, la eliminación urinaria - Para Bovinos, Ovinos y Equinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.msd-salud-animal.com.ar/products/112_141383/productdetails_112_141635.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dexametasona L.A. Over 12 frascos x 10ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bf006a326a284d3e8d19e4b279169ddd~mv2.png',
  'Corticosteroide, antialérgico, antiflogístico - Larga acción - Para bovinos, Equinos y Ovinos.',
  '10ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/dexametasona-la/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Triclabendazol Over 2,5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e32fafacfb4444678a90a837c6b0ca26~mv2.png',
  'Antiparasitario interno indicado para controlar infestaciones de Fasciola hepática y Fasciola gigántica adultas e inmaduras. - Para: Bovinos.',
  '2,5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/triclabendazol-10/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Curapezuñas Concentrado Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_48ee4ee72a9645329c7cd626abd0c9dc~mv2.png',
  'Antiséptico y desinfectante podal - Formulación líquida destinada al tratamiento de la necrobacilosis del pie (pietín), con acción detergente, bactericida y cicatrizante - Para Bovinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.over.com.ar/product/curapezunas-concentrado/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Sales Rehidratantes FS 200 45 sobres de 35g c/u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_ebf7a15963904054b7eeb88f248eb228~mv2.png',
  'FS200 viene a complementar la estrategia FS para el control de la diarrea - Para: Bovinos.',
  '35g',
  '',
  '',
  ARRAY['bovino'],
  'http://www.lineafs.com/index.php?option=com_content&amp;view=article&amp;id=46&amp;Itemid=55',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Florfenicol Dairyfarma 100ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_68be8cc70229470198a43f6a933e6c66~mv2.png',
  'Potente antibiotico de larga acción. - Para: Bovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dicloxifen Q Ario Q 250ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_830bf52c44aa48a5b41ec644d40fc470~mv2.png',
  'Es la combinación de un antibiótico de amplio espectro con un Antiinflamtorio, analgésico y antipirético. Está indicado contra un amplio rango de enfermedades que afectan a Bovinos, ovinos y Porcinos, causadas por microorganismos sensibles a la Oxitetraciclina. - Para Bovinos y Ovinos.',
  '250ml.',
  'Oxitetraciclina clorhidrato 5,0 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.arioq.com.ar/pro_dicloxifen.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Curamic Ag Plata Microsules 440ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_f48a44b75f6848fb900399976a41936d~mv2.png',
  'Prevención y control de miasis - Para: Bovinos, Ovinos y Equinos.',
  '440ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.laboratoriosmicrosules.com/producto/curamic-ag/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overpen Compuesto LPU Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_30bb0ebc7bb041fdb0242e493480d34c~mv2.png',
  'Antibiótico de amplio espectro con el agregado de meloxicam como agente antiinflamatorio - Para Bovinos y Equinos.',
  '100ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.over.com.ar/product/overpen-compuesto-lpu/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Neosulf C Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f26e4292ea274d50981164293af87e59~mv2.png',
  'Antibiótico bactericida y antidiarreico - Antibiótico de amplio espectro - Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Cada comprimido contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/neosulf-c/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'OverSeal Over 24 Jeringas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e21b10dd118e40708a6858cdda4cf138~mv2.png',
  'Sellador interno de pezones. - Para Bovinos.',
  '',
  'Cada jeringa de 4 g contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/overseal/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Levac Biotay 1Lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biotay' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1323a4b404d14260b31891aa58a6d616~mv2.png',
  'Suspensión de propionato de calcio de administración oral - Para prevención y tratamiento de la Hipocalcemia - Para: Bovinos.',
  '1Lt.',
  'Propionato de calcio al 42%',
  '',
  ARRAY['bovino'],
  'http://biotay.com/productos/levac/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Venda Vetrap.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_48361d7006bc412bbb850708b83e4e75~mv2.png',
  'Venda Vetrap',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bicholuz Rio de Janeiro 1Lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0388f5566b0d45f1b0bf4d7a8e5b0052~mv2.png',
  'Curabicheras de uso tópico para el tratamiento y control de Miasis - Para: Bovinos, Ovinos y Equinos.',
  '1Lt.',
  'Acido Tánico 2g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Solar Plyrap 85km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f50e4c2cbfa450b89a3de049ee840dc~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Consumo 200-230 mA - Incluye bateria.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Solar Plyrap 75km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f50e4c2cbfa450b89a3de049ee840dc~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Consumo 160-220 mA - Incluye bateria.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Solar Plyrap 60km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f50e4c2cbfa450b89a3de049ee840dc~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Consumo 120-160 mA - Incluye bateria.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Solar Plyrap 45km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f50e4c2cbfa450b89a3de049ee840dc~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Consumo 80-130 mA - Incluye bateria.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Solar Plyrap 35km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f50e4c2cbfa450b89a3de049ee840dc~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Consumo 70-100 mA - Incluye bateria.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Solar Plyrap 20km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f50e4c2cbfa450b89a3de049ee840dc~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Consumo 50-70 mA - Incluye bateria.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Solar Plyrap 7km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f50e4c2cbfa450b89a3de049ee840dc~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Consumo 30mA - Incluye bateria.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Dual Plyrap 120km 12/220 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 5.0km - Funciona a 12 y 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Dual Plyrap 70km 12/220 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 2.5km - Funciona a 12 y 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Dual Plyrap 40km 12/220 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 1.2km - Funciona a 12 y 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 400km 220 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta +7 km - Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 200km 220 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 7 km - Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 120km 220 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 5 km - Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 120km 12 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_cea5c70963244b1790ed5b0a0bea8ad4~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 5 km - Funciona a 12 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 70km 12 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_cea5c70963244b1790ed5b0a0bea8ad4~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 2.5 km - Funciona a 12 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 70km 220 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 2.5 km - Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 40km 220V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 1.2km - Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 40km 220 V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_00f31b016901463cbcb8414f6dffcf07~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 1.2km - Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alambre Galvanizado 16/14 Mediana Resistencia 1km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_571c4e8bf9574dcd87ff927311c4bfe3~mv2_d_4896_3264_s_4_2.png',
  'Alambre Galvanizado.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ocramicin L.A. Biotay 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biotay' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_fb35458b474f4ce1b0c9c3d8e2cc7add~mv2.png',
  'Antibiótico inyectable para el tratamiento de enfermedades causadas por agentes suceptibles - Para: Bovinos y Ovinos.',
  '250ml.',
  'Oxitetraciclina L.A. 20%',
  '',
  ARRAY['bovino', 'ovino'],
  'http://biotay.com/productos/ocramicin-la/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Unimag Richmond 530ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ff4014e4eadb4518b5a87c4a73887199~mv2.png',
  'Sales de magnesio y calcio - Unimag provee cuatro compuestos de magnesio orgánico de alta biodisponibilidad, en combinación con una sal orgánica de calcio - El Magnesio en el organismo animal no posee ningún órgano de reserva o depósito específico - Este nutriente se encuentra en todas las células activando un extenso sistema enzimático preciso e imprescindible para la vida, mantenimiento y producción animal - Para: Bovinos y Ovinos.',
  '530ml.',
  'Magnesio, lactobionato: 10,76 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=4',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bebedero galvanizado de 5 x 0,8 mt para hacienda.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_9490a4d4b26940619625e7248ba42e9d~mv2.png;06b954_f05d88ef578a494d905986ccebe1bd94~mv2.jpg',
  'Estos bebederos son aptos para cualquier tipo de animal. Su poco peso y su construcción simple, los hace fáciles de manipular. Las bateas son de chapa galvanizada con marcos de hierro ángulo que aumentan su resistencia.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bebedero galvanizado de 5 x 0,65 mt para hacienda.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_7303fcef7f3445f5a8c70b523a6e77f6~mv2.png;06b954_f05d88ef578a494d905986ccebe1bd94~mv2.jpg',
  'Estos bebederos son aptos para cualquier tipo de animal. Su poco peso y su construcción simple, los hace fáciles de manipular. Las bateas son de chapa galvanizada con marcos de hierro ángulo que aumentan su resistencia.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Chapa acanaladas N°18 para Tanque Australiano de 1,10 x 3,05 mt.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_661d5672f5bc401584f9e48eb0bc813e~mv2.png;06b954_4deb3a59b03d4c159e55284c2459487a~mv2.jpg',
  'Los tanques australianos son construidos con chapas galvanizadas de 1,10m x 3,05m en calibre N° 18.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Torre para Molino Huracan 27 pies para rueda de 6 y 8 pies.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_b285ba4983a2472fa0b05f216bd4bc54~mv2.png;06b954_b87c40a74b114c84be9714b085468bd2~mv2.png;06b954_555c6021e714423285f71a3f4e3752c5~mv2.jpg',
  'Torre para molino de 27 pies para rueda de 6 y 8 pies - En los molinos a viento Huracan no hay partes ni mecanismos complejos - La totalidad de sus piezas están diseñadas para proporcionar una construcción sólida y a la vez sencilla, asegurando un rendimiento insuperable y prolongada vida útil bajo condiciones climáticas extremas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Torre para Molino Huracan 27 pies para rueda de 10 pies.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_3fb82b474e46403ebc42a7ebd9aca6b4~mv2.png;06b954_4f5179b2e3d04fdd8601cb4395ff6d30~mv2.png;06b954_555c6021e714423285f71a3f4e3752c5~mv2.jpg',
  'Torre para molino de 27 pies para rueda de 10 pies - En los molinos a viento Huracan no hay partes ni mecanismos complejos - La totalidad de sus piezas están diseñadas para proporcionar una construcción sólida y a la vez sencilla, asegurando un rendimiento insuperable y prolongada vida útil bajo condiciones climáticas extremas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Torre para Molino Huracan 21 pies para rueda de 10 pies.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_f0e54d42118b4c79a900ba054a556321~mv2.png;06b954_b32e620e7a1a46929ce1a5acfcd13755~mv2.png;06b954_555c6021e714423285f71a3f4e3752c5~mv2.jpg',
  'Torre para molino de 21 pies para rueda de 10 pies - En los molinos a viento Huracan no hay partes ni mecanismos complejos - La totalidad de sus piezas están diseñadas para proporcionar una construcción sólida y a la vez sencilla, asegurando un rendimiento insuperable y prolongada vida útil bajo condiciones climáticas extremas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Torre para Molino Huracan 21 pies para rueda de 6 y 8 pies.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_999a1eef9cc34629aa4bbc1c6138cb7c~mv2.png;06b954_a814c9e18a8f427ca90209c441fa391a~mv2.png;06b954_555c6021e714423285f71a3f4e3752c5~mv2.jpg',
  'Torre para molino de 21 pies para rueda de 6 y 8 pies - En los molinos a viento Huracan no hay partes ni mecanismos complejos - La totalidad de sus piezas están diseñadas para proporcionar una construcción sólida y a la vez sencilla, asegurando un rendimiento insuperable y prolongada vida útil bajo condiciones climáticas extremas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Maquina para Molino Huracan 10 pies.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_28516eca5a834387982d04c8f8946dbc~mv2.png;06b954_85c17a3f499641169b485cf1ca357d64~mv2.png',
  'En los molinos a viento Huracan no hay partes ni mecanismos complejos - La totalidad de sus piezas están diseñadas para proporcionar una construcción sólida y a la vez sencilla, asegurando un rendimiento insuperable y prolongada vida útil bajo condiciones climáticas extremas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Maquina para Molino Huracan 8 pies.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_fedc4bad74c84d979b4699d1212822c2~mv2.png;06b954_a536f559382c40f4a66a3855cd59a066~mv2.png',
  'En los molinos a viento Huracan no hay partes ni mecanismos complejos - La totalidad de sus piezas están diseñadas para proporcionar una construcción sólida y a la vez sencilla, asegurando un rendimiento insuperable y prolongada vida útil bajo condiciones climáticas extremas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Maquina para Molino Huracan 6 pies.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_3f3ec96084e74b00928d19e1982ec9e4~mv2.png;06b954_c7322265683f41e8bf18d801ca1f059c~mv2.png',
  'En los molinos a viento Huracan no hay partes ni mecanismos complejos - La totalidad de sus piezas están diseñadas para proporcionar una construcción sólida y a la vez sencilla, asegurando un rendimiento insuperable y prolongada vida útil bajo condiciones climáticas extremas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cable Subterraneo x 50 mt.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4cde473b1c334d05b2253d8380075289~mv2.png',
  'Cable Subterraneo por 50 metros.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Estrumate MSD 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7f332966c0b54c66b803b214b0d94bcf~mv2.png',
  'Prostaglandina sintética - Sincronización de celos, endometritis crónica purulenta, interrupción de preñez ( aborto o parto) - Para: Bovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.msd-salud-animal.cl/products/estrumate/020_detalle_de_producto.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Neocuprexan Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_fb4c01bd2a1a4f7195192d4be6783d70~mv2.png',
  'Suplemento mineralizante destinado al tratamiento preventivo de las deficiencias de cobre, zinc, selenio, iodo y manganeso en bovinos - Para: Bovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/neocuprexan/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bloker Ultra 80% Biotay 20l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biotay' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c636949355364177b62b24d6b3aeae1d~mv2.png',
  'Carminativo, en base a Tensioactivos no Iónicos, para dosificar en bebederos o aspersión de pasturas - Para: Bovinos.',
  '20l.',
  'Alcoholes etoxilados.',
  '',
  ARRAY['bovino'],
  'http://biotay.com/productos/bloker-ultra/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Carminativo NF Max Brouwer 20l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Brouwer' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e28768c131d441eebd4d9e1f50994759~mv2.png',
  'Antibiótico y antidiarreico - Carminativo - Para: Bovinos.',
  '20l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://brouwer.com.ar/productos/carminativo-nf-max/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Marcador Allflex',
  18375,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_36a8bce5afcb44f798e36ac4104252bf~mv2.png',
  'Los marcadores Allflex aseguran un marcaje de máxima perdurabilidad en la caravana - Permiten un secado inmediato de la tinta y soportan condiciones climáticas adversas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pour Metrin Von Franken 5l.',
  76670.5,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4f30356c93744c7bb0e158535d5e1973~mv2.png',
  'Antiparasitario externo Pour-on - Piojicida, acaricida, eficaz contrala mosca de los cuernos (Haematobia irritans). - Para: Bovinos y Ovinos.',
  '5l.',
  'Cipermetrina 5,00 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.fatrovonfranken.com/Productos/Grandes-Animales_Antiparasitarios-Externos/Pour-Metrin',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Albendazol Vetanco 5l.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_e7eddc91e93e46a7af110e3a5437fdcf~mv2.png',
  'Antiparasitario interno - Para el tratamiento de Nematodes gastrointestinales y pulmonares, Anoplocefalídeos y Trematodes. - Para: Bovinos y Ovinos.',
  '5l.',
  'Albendazol 10%',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.vetanco.com/es/produto/albendazol-vetanco/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Triplemic Microsules 3l.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_0ead2bab1f0349b395a0dc816c819d37~mv2.png',
  'Endectocida - Antiparasitario interno de amplio espectro, Nematodicida de amplio espectro y fasciolicida con acción sobre jovenes y adultos - Para: Ovinos.',
  '3l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['ovino'],
  'http://www.laboratoriosmicrosules.com/producto/triplemic/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cumevern Agropharma 1 Dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agropharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_18e166b8093d45c6b173e4a5b115a270~mv2.png',
  'Antiparasitario interno de amplio espectro - Antiparasitario interno de amplio espectro - Para Equinos.',
  '1 Dosis.',
  'Cada 100 gramos contiene:',
  '',
  ARRAY['equino'],
  'http://richmondvet.com.ar/?seccion=productos&amp;sub=4&amp;cat=17',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Parasinort D Nort 22gr.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_27ab2adfbeff44a79d3405aab85cc672~mv2.png',
  'Antiparasitario Interno - En todas las paracitosis gastrointestinales, tanto en sus formas adultas así también en larvas y huevo - El agregado de metionina protege la célula hepática evitando lesiones de origen medicamentoso - Para: Equinos.',
  '22g',
  'Metionina-Oxibendazol-Tricolorfon Oxibendazol 22,7 grs.',
  '',
  ARRAY['equino'],
  'http://laboratoriosnort.com/index.php?sec=3&amp;cod=6',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Piedra Hexaplus Hipermagnesiado Hexagono 20kg.',
  52412.65,
  NULL,
  'https://static.wixstatic.com/media/06b954_e8fc7a56ae694c4fa648762aa5838133~mv2.png',
  'Los principales factores que intervinientes o desencadenantes de la hipomagnesemia son: aumento brusco de la la temperatura (rebrotes de otoño) genera desbalances de minerales dentro de la plantalos días nublados reducen el foto periodohaciendo menos digestibles los forrajessuelos mal drenados con baja absorción decationes por la la planta. Forrajes con bajo contenido de emergía y altocontenido de nh3. El bajo contenido de elegía genera poca producciónde ácidos grasos volátiles, aumentando el ph. ruminaly reduciendo la absorción de magnesio. Es por ello la importancia de usar bloques multinutricionales ricos en minerales y ricos en energía. La enfermedad afecta mas a animales adultos con producción láctea alta, vacas gordas unida a una situación de stress. Las vacas en post parto. Un concepto que debemos tener claro es la suplementación del magnesio en forma oral mediante bloques, combinación con fuentes de energía ruminal son la forma mas fácil y económica de prevenirla enfermedad - Para: Bovinos.',
  '20kg.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.hexagono.com.ar/nuevo_site/hexaplus_hipermagnesiado.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit Adaptador Vit y Min Biogenesis Bago 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_46e1f599b2ac4fc6926c13cb4a76f6ed~mv2.png',
  'Adaptador Min: Suplemento mineral inyectable - Adaptador Vit: Suplemento Vitamínico inyectable - Para: Bovinos.',
  '500ml.',
  'Min: Cobre (como edetato )1,0 g.',
  '',
  ARRAY['bovino'],
  'http://www.biogenesisbago.com/ar/productos/id91/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Treo Zoetis 500ml.',
  164915,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_000be4313fb54a5b820b09591e51365b~mv2.png',
  'Endectocida inyectable de amplio espectro y larga persistencia - Para: Bovinos y Ovinos .',
  '500ml.',
  'Cada 100 ml de solución contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aut Pietin Rio de Janeiro 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rio de Janeiro' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0f0f3d8697764088802c5a87f20113a8~mv2.png',
  'Es una preparación farmacológica ideal, para utilizar en problemas de pie - Asocia en su formula, el ácido Hidroclórico y el Azul de Metileno, para lograr un efecto local potenciado - Para Bovinos, Equinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.allignanihnos.com.ar/#/landing/detalleProducto/20',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit Emefur Boehringer 100 dispositivos.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_3362794298f940cbacbc050c42dcb817~mv2.png',
  'Regulación del ciclo estral en vacas y vaquillonas - Programas de inseminación artificial a tiempo fijo (IATF) o con detección de celo programado - Transferencia embrionaria - Para: Bovinos.',
  '100 dispositivos.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Hilo para Arrolladora Pick Up 3000mts.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_b2c82e6e957547cfb7039b72d9247e0f~mv2.png',
  'Hilo para Arrolladora',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Mamyzin M Boehringer Ingelheim 20 inyectores de 5 ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_528440c5a8f64d03baafcadefcac8d03~mv2.png',
  'Inyector intramamario - Antibiótico de amplio espectro para el tratamiento de mastitis durante el periodo de ordeña - Para Bovinos.',
  '5 ml.',
  'Cada 5 ml contienen:',
  '',
  ARRAY['bovino'],
  'https://www.boehringer-ingelheim.mx/salud-animal/bovinos/mamyzin-m',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overseg Plus OXI Over 25ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_833c360a6f8a45ae9e42ca29089f18e2~mv2.png',
  'Formulación destinada al control simultáneo de anaplasmosis y piroplasmosis, contiene diminacene diaceturato, que al no eliminar el 100% de las babesias genera un estado de inmunidad que es más eficiente que la eliminación total - La oxitetraciclina es el antibiótico de elección contra anaplasmosis - La dipirona detiene la fiebre, evita la depresión, estimulando el apetito y la pronta recuperación del animal - Tanto la babesia como el anaplasma producen anemia, por este motivo, OVERSEG PLUS OXI contiene vitamina B12 que estimula la eritropoyesis - Para Bovinos.',
  '25ml.',
  ':',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/overseg-plus-oxi/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Gemicin 100 Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_804d952a35fa4761a10a7e3ccb936128~mv2.png',
  'Antibiótico de amplio espectro (Gentamicina al 10%) destinado al tratamiento y control de enfermedades específicas e inespecíficas - Solución lista para usar - Para Bovinos y Equinos.',
  '100ml.',
  'Cada 100 ml de producto contiene:',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.over.com.ar/product/gemicin-100/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Imidover (Imidocarb 12%) Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_153d199f41ff4191a7fdb0436e38a133~mv2.png',
  'Hemoparasiticida destinado al tratamiento y control de babesiosis y anaplasmosis - Para Bovinos.',
  '100ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/imidover-imidocarb-12/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Zactran Boehringer 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ba9af3e434db46e3816e67c97acfb512~mv2.png',
  'Antibiótico inyectable - Tratamiento terapéutico y preventivo de la enfermedadrespiratoria bovina (ERB) asociada a Mannheimia haemolytica, Pasteurella multocida e Histophilus somni - Antes del tratamiento preventivo, deberá establecerse lapresencia de la enfermedad en el rodeo - Para bovinos - Una única inyección subcutánea.',
  '100ml.',
  'Cada ml. contiene:',
  '',
  ARRAY['bovino'],
  'http://www.sani.com.ar/producto.php?id_producto=6625',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'AZ5 Von Franken 500ml.',
  30507.35,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_34c7699b90e14b83a22486f530f1beec~mv2.png',
  'Prevención y tratamiento de hipocalcemias, hipomagnesemias, hipofosfatemias, afosforosis, hipocuprosis y raquitismo - Mejoramiento de la fertilidad y actividad sexual de los machos, regularización de los celos, prevención de abortos - Aumento de la producción láctea, activación del crecimiento y desarrollo - Recuperación de animales convalescientes y desnutridos - Elevación de las defensas naturales e incremento de la respuesta inmunitaria - Para: Bovinos, Equinos y Ovinos.',
  '500ml.',
  'Magnesio hipofosfito hexahidrato 10 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.fatrovonfranken.com/Productos/Grandes-Animales_Mineralizantes/A-Z-5',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Micotil 300 Elanco 10ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_c1a3d051c16d44f4a1d800c868a2f21e~mv2_d_4896_3264_s_4_2.png',
  'Antibiótico Inyectable - Solución Inyectable exclusivamente subcutánea en bovinos - Tratamiento sintomático y específico de afeciones broncopulmonares agudas causadas por agentes sensibles a la oxitetraciclina - Tratamiento de la Queratoconjuntivitis infecciosa bovina relacionada con sepas suceptibles de moraxella bovis - Para: Bovinos.',
  '10ml.',
  'Cada ml contiene:',
  '',
  ARRAY['bovino'],
  'https://www.viarural.com.ar/viarural.com.ar/insumosagropecuarios/ganaderos/laboratorio-vet/elanco/micotil-300.htm',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Zactran Boehringer 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ba9af3e434db46e3816e67c97acfb512~mv2.png',
  'Antibiótico inyectable - Tratamiento terapéutico y preventivo de la enfermedadrespiratoria bovina (ERB) asociada a Mannheimia haemolytica, Pasteurella multocida e Histophilus somni - Antes del tratamiento preventivo, deberá establecerse lapresencia de la enfermedad en el rodeo - Para bovinos - Una única inyección subcutánea.',
  '250ml.',
  'Cada ml. contiene:',
  '',
  ARRAY['bovino'],
  'http://www.sani.com.ar/producto.php?id_producto=6625',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Azadieno Plus Boehringer 4l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f4e11dde5e3144459065a622391e80bd~mv2.png',
  'Ectoparasiticida bovino sin resistencia, prolongado efecto residual, que mantiene el baño aséptico todo el año - Garrapaticida, antisárnico y piojicida - Control de garrapatas resistentes - Garrapaticida sin resistencia, residual - Para: Bovinos.',
  '4l.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Fatroximin Secado Fatro Von Franken 12 Jeringas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6c3498d4a7294d7b930809fdc5485f91~mv2.png',
  'Indicado en la prevención y tratamiento de la mastitis clínica y subclínica en el período de secado de la vaca lechera - Solución Inyectable - Para Bovinos.',
  '',
  'Rifaximina 0,100 g.',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vitaminas AD3E Microsules 500ml.',
  93166.1,
  NULL,
  'https://static.wixstatic.com/media/06b954_c77c09ceae3b451ebcff01a994db653e~mv2.png',
  'Solución oleosa inyectable de vitaminas A, D3 y E - Indicada para el tratamiento de las avitaminosis A, D y E, y como terapia complementaria de:Tratamientos antimicrobianos y antiparasitarios, Convalecencias, Gestación y post-parto, Estrés y Carencias alimentarias de diversas etiologías - Para: Bovinos y Ovinos.',
  '500ml.',
  'Vitamina A (Palmitato)50.000.000 U.I.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.laboratoriosmicrosules.com/producto/ad3e-microsules/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Piliguard Moraxella bovis trivalente MSD 50 dosis 100ml.',
  108137.5,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6e81bad4c67f4063ba81675aae52ff9c~mv2.png',
  'Vacuna bacterina para la prevención de la queratoconjuntivitis bovina causada por las cepas de moraxella bovis - Para: Bovinos, Equinos y Ovinos.',
  '50 dosis 100',
  '',
  '',
  ARRAY['bovino'],
  'http://www.msd-salud-animal.com.ar/products/piliguard-querato-i/productdetails-piliguard-querato-i.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pomada Curabichera Bactrovet Plata Konig 455gr.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_47e0f884538a43b08dd7a15718d59bc7~mv2.png',
  'Antimiásico, repelente, bactericida, antifúngico, cicatrizante, epitelizador y hemostático - Tratamiento de todo tipo de heridas en todas las especies - Tratamiento y prevención de bicheras en intervenciones quirúrgicas como castración, y heridas de cualquier origen - Heridas en general. - Para: Bovinos y Equinos.',
  '455g',
  'Cada 100 gramos contiene:',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.koniglab.com/producto/bactrovet-plata-pasta/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tetraelmer Elmer 100 capsulas.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_07bfcee78094421ba4aa9d9e4d2bf724~mv2.png',
  'Indigestiones, intoxicaciones alimenticias, acetonemia, insuficiencia hepática, inapetencia, meteorismo, coadyuvante en el tratamiento de las parasitosis intestinales - Es activo frente a un gran número de agentes Gram positivos como negativos: Estreptococos, estafilococos, clostridium, bacillus anthracis, diplococos, corynebacterium, actinomyces, actinobacilus, colibacilos, salmonellas, pasteurellas, haemophilus, shigellas, bordetellas, klebsiellas, neisserias, brucellas, aerobacter, vibrios, leptospiras, ricketsias, anaplasmas, borrelias, entamoeba histolytica y clamidia psitacci- Para: Bovinos, Equinos y Ovinos.',
  '',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://elmerlab.com/producto/tetraelmer/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Prosel Richmond 500ml.',
  19870,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_3090e4a9a0bd44ac9e2bc53ee5a55e1c~mv2.png',
  'Promotor orgánico de crecimiento, desarrollo y fertilidad - Satisface las necesidades de vitamina E y vitamina A, garantizando un aporte de Selenio inocuo y preciso - Aumenta la formación de espermatozoides (cantidad y viabilidad) - Reduce cuadros de disfunción ovárica nutricional (anestro, ovarios quísticos, cuerpos lúteos persistentes) - Elimina las retenciones de placenta, los abortos, metritis post parto y la reabsorción embrionaria - Disminuye la muerte perinatal y eleva las defensas celulares y humorales en animales jóvenes - Revierte la enfermedad del músculo blanco, distrofias o disfunciones musculares - Previene el Enteque seco - Disminuye el recuento de células somáticas en leche - Promueve el engorde, desarrollo y crecimiento - Aumenta la producción láctea - Para: Bovinos.',
  '500ml.',
  'Selenio: 0,32 mg.',
  '',
  ARRAY['bovino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=4&amp;id=24&amp;pg=1',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Iodo Doble Cu-Tral-Co 250ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_c23cd280d8e14dfaa6b9d6b3b6a75707~mv2.png',
  'Cáustico - Revulsivo - Para Bovinos, Equinos y Ovinos.',
  '250ml.',
  'Iodo metalico 7 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Gondadiol Benzoato de Estradiol Zoetis 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_cc380f35a0da4b9a997edd1907d5c44a~mv2.png',
  'El uso de Benzoato de Estradiol al momento de la aplicación del progestágeno provoca una nueva onda folicular; la aplicación del Benzoato de Estradiol a la extracción del progestágeno induce un pico preovulatorio de LH a través del feed back positivo del estradiol sobre el GnRH y LH lo que resulta en una alta sincronía de ovulaciones - Para: Bovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Trivalico A.D.E. 5 Rosenbusch 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rosenbusch' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_cb78d3cdb78e4ac987c2f55a1acaf514~mv2.png',
  'Suplemento indicado para estados deficitarios vitamínico-minerales, alimentarios o fisiológicos - Para: Bovinos.',
  '250ml.',
  'Vitamina A 5.000.000 UI.',
  '',
  ARRAY['bovino'],
  'http://www.rosenbusch.com/argentina/gprodfarm_vitam.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Nutrekid V.M. 10 Rosenbusch 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rosenbusch' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8b4f422117bc40ca8d44337e4ee82c45~mv2.png',
  'Suplemento vitamínico mineral indicado para el tratamiento de deficiencias de oligoelementos y vitaminas A, D y E en terneros - Especialmente indicado para prevenir el stress en el momento del destete - Para: Bovinos.',
  '250ml.',
  'Vitamina A 2.000.000 U.I.',
  '',
  ARRAY['bovino'],
  'http://www.rosenbusch.com/argentina/gprodfarm_vitam.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Hepagen Von Franken 100ml.',
  52466.6,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c873c318a32f47329a859e4f9917ba28~mv2.png',
  'Indigestiones, intoxicaciones alimenticias, acetonemia, insuficiencia hepática, inapetencia, meteorismo, coadyuvante en el tratamiento de las parasitosis intestinales - Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.fatrovonfranken.com/Productos/Grandes-Animales_Hepatoprotectores/Hepagen',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Lidocaína 2% Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_fb3e1ff4e09f48838976d6ecc9e82b07~mv2.png',
  'Anestésico local para anestesia de infiltración o bloqueo nervioso; anestesia epidural y anestesia de superficie. - Para Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/en/product/lidocaine-2/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Duva Rehidratante Agropharma 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agropharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_cad1cc014eb14c25b33c3f4ee1d2fae2~mv2.png',
  'Rehidratante Electrolítico con Aminoácidos - Deshidratación de cualquier etiología (diarrea, vómitos, etc.) - Intoxicaciones - Estados de agotamiento físico - Pérdida de electrolítos - Hemorragias - Stress - Hipoproteinemias - Poliurias - Hepatopatías - Sudoración intensa - Convalescencia - Sobreentrenamiento - Shock quirúrgico o traumático - Inapetencia - Para: Bovinos, Equinos y Ovinos.',
  '500ml.',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://agropharma.net/producto/duva-rehidratante/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Sulfaprim Von Franken 100ml.',
  35676.15,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1fc32915a1f24ce3a5c9f6765d679187~mv2.png',
  'Infecciones pulmonares y gastroentéricas, flemones, abscesos, Coccidiosis, tratamiento pre y postoperatorio - Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.fatrovonfranken.com/Productos/Pequenos-Animales_Antibioticos/Sulfaprim',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alliance Respiratoria Boehringer 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1c11cd4e04424137b189925b10edee60~mv2.png',
  'Para la prevención de afecciones respiratorias en bovinos, asociadas a virosis por Rinotraqueítis infecciosa bovina HBV 1, Parainfluenza 3 bovina PI3 y bacterias: neumonías causadas por Pasteurella multocida tipo A, o Histophilus somni, y co-infecciones con Arcanobacterium pyogenes- Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dipirona 50% Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1b681e15b79e4ce693b287c07d3250fd~mv2.png',
  'Analgésico - Antipirético - Antiespasmódico - Antiinflamatorio - Para Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/dipirona-50/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Microfos Microsules 100ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_567a16bfdd5a42568133e8adef307b1e~mv2.png',
  'Microfos contiene fósforo, asociado a cobalto, cobre y manganeso, lo que permite la regulación de trastornos metabólicos agudos y crónicos así como también sobre el comportamiento reproductivo - El fósforo es esencial para la formación de huesos y dientes, y los fosfatos en la formación de proteínas y enzimas tisulares y son de gran importancia en el metabolismo intermedio de los hidratos de carbono y de la creatina, en las reacciones químicas que ocurren durante la contracción muscular - El cobalto participa en la formación de la molécula de hemoglobina al facilitar la incorporación del hierro - El cobre es esencial en la hematopoyesis y en la formación ósea - El manganeso participa en el crecimiento y en el proceso reproductivo - Su carencia puede causar falta de celo, ausencia de fecundidad y producción de semen de baja calidad - Para: Bovinos y Ovinos.',
  '100ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.laboratoriosmicrosules.com/producto/microfos/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Calciomic Microsules 500ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_e24eff317091403aae2a41e8457b3640~mv2.png',
  'Calcificante magnesiado con Fósforo, Glucosa, Calcio y Magnesio, con acción estimuladora y reanimante. Hipocalcemia, hipomagnesemia, debilidad, temblores, tetanias, fiebre vitular, eclampsia y acetonemia - Síndrome de vaca caída - Para: Bovinos, Equinos y Ovinos.',
  '500ml.',
  'Gluconato de calcio monohidrato 40 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.laboratoriosmicrosules.com/producto/calciomic/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vitonal B Richmond 530ml.',
  17372,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c5b4109b07fa4df088c35a697dc6ef7f~mv2.png',
  'Solución iónica balanceada, específicamente desarrollada para reponer en forma instantánea el desbalance interno producido en el síndrome de vaca caída - A base de sales orgánicas de Calcio, Magnesio, Fósforo, Potasio, Cloro y Sodio combinadas con Tiamina y Cafeína, inyectable - Provee todas las calorías que el animal en la grave situación (desbalance nutricional) requiere, restaurando su metabolismo energético -instantáneamente. Es un reconstituyente oligomineral - Para: Bovinos .',
  '530ml.',
  'Calcio, borogluconato: 8,26 g.',
  '',
  ARRAY['bovino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=4&amp;id=23&amp;pg=1',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Crema de Ordeño Over 500g.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_97858acfbb6d49718db1da19789026b1~mv2.png',
  'Crema con propiedades antisépticas, lubricantes, cicatrizantes y anestésicas - Para: Bovinos, Equinos, Ovinos.',
  '500g.',
  'Cada 100 g contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/crema-de-ordeno-con-anestesico/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tambox Crema de Ordeño Rosenbusch 1kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rosenbusch' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_15b6d325f14b4bfd92cedb1964b44485~mv2.png',
  'Antiséptico y cicatrizante de escoriaciones, llagas y heridas de los pezones de vacas en ordeñe - Lubricante de las manos del ordeñador - Para: Bovinos.',
  '1kg.',
  'Vitamina A 10.000UI.',
  '',
  ARRAY['bovino'],
  'http://www.rosenbusch.com/argentina/gprodfarm.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overxicam Over 50cc.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4348611bba7e4ded923cac2ca673531f~mv2.png',
  'Antiinflamatorio no esteroide. Potente acción analgésica y antiinflamatoria - Indicado para fuertes dolores musculares y calambres - Para: Bovinos y Equinos.',
  '',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.over.com.ar/product/overxicam/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Clamoxyl L.A. Zoetis 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f954140d47694dbca6158b6d0ab63075~mv2.png',
  'Antibiótico inyectable de larga acción, bactericida de amplio espectro y larga acción, efectivo sobre patógenos Gram positivos y Gram negativos - La amoxicilina se absorbe rápidamente alcanzando su pico máximo a los 30 minutos y mantiene niveles terapéuticos en sangre y tejidos durante 48 horas luego de la administración - Para: Bovinos y Ovinos.',
  '100ml.',
  'Amoxicilina trihidrato: 15,3 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'https://ar.zoetis.com/products/clamoxyl-la.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Aspersin Biogénesis Bagó 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7d5465892ab042268bffc29e766f890d~mv2.png',
  'Antiparasitario externo formulado a base de cipermetrina y clorpirifós - Esta combinación potencia mutuamente el efecto de ambos principios activos dado el sinergismo que producen entre sí los piretroides y órganofosforados - Su formulación especial para aspersión facilita un correcto mojado y la adherencia de los principios activos a la piel de los animales - Para: Bovinos y Ovinos.',
  '250ml.',
  'Cipermetrina 20 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.biogenesisbago.com/ar/productos/id64/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Señalador de Oreja Villa Nueva',
  146616.4,
  NULL,
  'https://static.wixstatic.com/media/06b954_84c055bb9d464959a4ae987886aa2127~mv2.png;06b954_431ba542f8194e5bad09ce9d1ba43279~mv2.jpg',
  'Señalador de Oreja. Preguntar por modelos disponibles.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Triple Mancha, Gangrena y Enterotoxemia Providean Tecnovax 60 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_524e8a0b2f374bfbaa47cae69109302b~mv2.png',
  'Los agentes clostridiales causantes de Mancha, Gangrena y Enterotoxemia pueden prevenirse en forma económica eligiendo una vacuna con potencia garantizada en cada serie.Las Enfermedades Clostridiales (EC) enferman al ganado en forma repentina, causando muertes, incluso antes de que puedan observarse síntomas. Los animales de todas las categorías son susceptibles en todo momento de su vida. - Para: Bovinos.',
  '60 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-mge/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Lepto 8 Tecnovax Providean 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b7373646a59448f5a604b56199a53635~mv2.png',
  'Providean Lepto 8, es la vacuna contra la mayor cantidad de serovares de leptospiras disponible en el mercado. Cada lote de producción, es sometido a pruebas de potencia directa, brindando de esta forma una combinación de amplio espectro y alta potencia protectiva en cada lote. - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-lepto-8/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Prostal Over 20ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8c923388de50467abc6dfac681cf29b3~mv2.png',
  'Hormonal. Análogo sintético de la prostaglandina F2 alfa - Agente luteolítico - Indicado para la sincronización del celo, desórdenes funcionales del ciclo estral, inducción al parto o al aborto, desórdenes funcionales de los ovarios (quistes luteales o foliculares), patologías uterinas postparto (piómetras, endometritis) - Para: Bovinos y Equinos.',
  '20ml.',
  '',
  '',
  ARRAY['bovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kit DIB 0,5 Zoetis Syntex 100 dispositivos.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6076b4a48f5446b8bac4e08585606b1a~mv2.png',
  'Dispositivo de silicona inerte impregnado con 0.5 g de progesterona natural de liberación controlada para un solo uso - Sincroniza el celo en vacas y vaquillonas - Tratamiento de anestro pos parto - Posibilita el retorno a servicio - Acortamiento de período parto-concepción - Complemento en tratamiento de superovulación - Para: Bovinos.',
  '100 dispositivos.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ovusyn Syntex.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Syntex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_596d76debda94258882c229cc09788ac~mv2.png',
  'Inductor y sincronizador de la ovulación - Estimula el desarrollo luteal y la secreción de progesterona plasmática; previene la muerte embrionaria - Coadyuvante en el tratamiento de subfertilidad, infertilidad, anestro - Para: Bovinos, Equinos y Ovinos.',
  '',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Novormon 5000 Zoetis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2f412e56cb8f4217b43b501a41d55d01~mv2.png',
  'Inducción y sincronización de celos - Inducción de la ovulación y superovulación - Para: Bovinos y Ovinos.',
  '',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Celo Test Biotay 500ml.',
  17504.45,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biotay' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7c68e857cf2741c29d4831593cc194df~mv2.png',
  'Pintura para marcar la cola de las vacas facilitando la identificación de las que están en celo y se han dejado montar - Para: Bovinos.',
  '500ml.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alliance Plus Boehringer 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0826db6571fb48c4909d722c61d66731~mv2.png',
  'Segura prevención en manejos intensivos contra las Neumonías, Queratoconjuntivitis, Mancha y Enterotoxemia con muerte súbita en los bovinos. - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alliance Reproductiva Boehringer 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ac7f057b90cc4ab6a6252242bcf70d95~mv2.png',
  'Prevención de los problemas reproductivos en bovinos debido a: Rinotraqueítis viral bovina, diarrea viral bovina, leptospirosis, campylobacteriosis e histophilosis - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alliance Querato Boehringer 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d6139ed47d8d427394992c7a562ffe0b~mv2.png',
  'Para la prevención de infecciones oculares en bovinos, particularmente conjuntivitis y queratitis debido a: Rinotraqueítis Viral Bovina, Moraxella bovis y complicaciones con Arcanobacterium pyogenes. - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Querato Providean Tecnovax 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_970f02acf9f24fc3a3c85ec5b0e479e7~mv2.png',
  'La Queratoconjuntivitis infecciosa (QIB) genera una severa infección en la conjuntiva y cornea. Esta enfermedad causa altos costos de tratamiento y un fuerte debilitamiento general del animal, estimado en 10 kg. de peso vivo por cada ojo afectado. - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-querato/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Autodosificadora Lider Matic 5 c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_ee5c892f49aa4c43b601eef43af778e4~mv2.png',
  'Desarrollado tanto para uso inyectable u oral - Resistente a pour on - Su sistema de mangos tipo tijera está diseñado para emplear el mínimo esfuerzo en la expulsión del medicamento (aún los más espesos) permitiendo el pasaje del líquido y logrando rapidez en las recargas - Provisto de una aguja punza matic, permite dosificar de un modo más directo.',
  '5 c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Autodosificadora Lider Matic 10c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8dbc0538076c480c83b6bbf74553b7e4~mv2.png',
  'Equipo provisto de una aguja punza matic, para poder dosificar de un modo directo desde el medicamento - Permite utilizar el dosificador en distintas posiciones sin alterar las aplicaciones - Su sistema de válvulas superaspirantes permiten el paso abundante y controlado del fluido, brindando velocidad en la recarga.',
  '10c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Autodosificadora Lider Dosi 50c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4e82237fd380420fb9945dbcaffa59c7~mv2.png',
  'Diseñado para la aplicación de antiparasitarios orales de gran capacidad - Su sistema de dosificador seguro, permite graduar el equipo en distintas posiciones y utilizar al máximo su capacidad - Realizado con mangos de aleación de aluminio inyectado con esmaltado inalterable, lo cual ofrece especial resistencia en usos prolongados.',
  '50c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Karate Zeon 5 CS Zyngenta 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2bed97b4113b4aaba00e2c762199167f~mv2.png',
  'Insecticida piretroide con base en lambda cyalotrina que actúa por contacto e ingestión sobre las plagas.',
  '1l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Clap Bayer 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Bayer' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b3d1b6855e5943f787a6b6cbfb3075ec~mv2.png',
  'Novedoso insecticida, por su modo de acción y residualidad, logra un excelente control de estas nuevas plagas en Siembra Directa - El ingrediente activo de Clap es Fipronil y está formulado como una suspensión concentrada al 20% - Pertenece a una nueva familia de insecticidas, los Fenilpirazoles, cuyo modo de acción es diferente a los grupos químicos de insecticidas hasta hoy conocidos - Una característica sobresaliente de Clap es su Poder Residual, tanto en el follaje tratado como en aplicaciones al suelo.',
  '250ml.',
  '',
  '',
  ARRAY[]::text[],
  'https://www.camponuevosrl.com/product-page/agroforce-20-sc-fipronil-20-huagro-1lt-consultar-precio',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Oxitocina Over 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_43133688b3a048e8b1cdca2d2df5aade~mv2.png',
  'Solución inyectable de oxitocina sintética, que actúa sobre la musculatura lisa del útero y de la ubre, provocando su contracción - Para: Bovinos, Equinos y Ovinos.',
  '50ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/oxitocina/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Togar BT Dow 1lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5e7b37be089f440b84f56bfc2c2d4359~mv2.png',
  'REEMPLAZADO POR EL TOCON EXTRA.Arbusticida específico para combatir malezas semi-leñosas, leñosas y palmas en pasturas naturales e implantadas - Su uso está recomendado específicamente para el control de renovales, fachinales, y malezas leñosas de gran porte - Sus principios activos son Picloram y Triclopyr.',
  '1lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tocon Dow 1lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_17814975ada740f39fb616c1d82075a0~mv2.png',
  'REEMPLAZADO POR EL TOCON EXTRA.Tocon es un herbicida selectivo, destinado al control de malezas dicotiledóneas de porte herbáceo, arbustivo y sub-arbustivo, en áreas de pasturas, específico para aplicaciones al tocón (inmediatamente después del corte de la planta) - El producto incluye un colorante que permite reconocer los tocones tratados - Su principio activo es Aminopyralid.',
  '1lt.',
  '',
  '',
  ARRAY[]::text[],
  'https://www.camponuevosrl.com/product-page/tocon-extra-dow-1lt-consultar-precio',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Storm Basf 1kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4b23b264d01f417782e0a294762a7ac5~mv2.png',
  'Rodenticida anticoagulante de última generación, de “una sola ingesta”, formulado como lentejones secos - Su elevada palatabilidad, su forma, peso, baja dosis y tamaño brindan versatilidad y permiten adoptar la estrategia correcta para lograr elevados niveles de control en pocos días, de manera segura y económica.',
  '1kg.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Biopoligen Air Biogenesis Bago 80 dosis 240ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8ab5a268f44a40c8b9feceb235fb8fa4~mv2.png',
  'Vacuna para la prevención de la queratoconjuntivitis infecciosa bovina producida por la acción individual o combinada de Herpesvirus bovino, Moraxella bovis y Branhamella ovis - Para: Bovinos, Equinos y Ovinos.',
  '80 dosis 240',
  '',
  '',
  ARRAY['bovino'],
  'http://www.biogenesisbago.com/ar/productos/id4/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Campylobacter 40 CDV 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'CDV' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_40116042563d48bdb0f8691196e66f4c~mv2.png',
  'Preventivo de cuadros reproductivos (infertilidad, aborto y muerte perinatal) producidos por bacterias del género Campylobacter (Vibrio). - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tuberculina PPD CDV 10ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'CDV' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9d761e93fe774a078906a30e11835b63~mv2.png;06b954_97d6ca5daeeb4391b0a3d745b6b9316b~mv2.png',
  'Antígeno para el diagnóstico de la tuberculosis en los Programas de Control y Erradicación de la enfermedad en los bovinos - Para: Bovinos.',
  '10ml.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Juego de Peines para peladora Heiniger.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4b17b69004c74e8ea5e5a51313cf238a~mv2.png',
  'Juego de Peines para peladora Heiniger.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Peladora Heiniger C12.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_70d3dbad46854b01a0957bb93046d190~mv2.png',
  'Peladora Heiniger C12.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Voltimetro Mandinga.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_719b92300b9e46b88e84bf828abf834e~mv2.png',
  'Voltimetro Mandinga.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Carretel con Cable Electroplástico Arriero 6 hilos 500mts.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_73161d2a76e74dbda605c74aa7c22abf~mv2.png',
  'Carretel con Cable Electroplástico 6 hilos 500mts.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cinta Electroplástica Arriero 5 hilos 400mts.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_e8b01bae231841d684328f6c6f2936e6~mv2.png',
  'Cable Electroplástico 5 Hilos.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cable Electroplástico Arriero 6 hilos 500mts.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_94d19d96c56541ca9d3d8d9816fbb212~mv2.png',
  'Cable Electroplástico 6 Hilos.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Meflosyl Zoetis 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_01d2cabcdc214908ae18e14137fa8a9d~mv2.png',
  'Analgésico. Antipirético. Antinflamatorio no esteroide con actividad analgésica no narcótica y antipirética. - Para Bovinos y Equinos.',
  '50ml.',
  'Flunixin meglumina: 5 g.',
  '',
  ARRAY['bovino', 'equino'],
  'https://ar.zoetis.com/products/equinos/meflosyl.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ubredem Biogenesis Bago 25ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f8ad24a1fb724de5bb905d5c4fd96624~mv2.png',
  'Asociación diurético-corticoide inyectable a base de Furosemida y Dexametasona - Para Bovinos y Equinos.',
  '25ml.',
  'Furosemida 5 g.',
  '',
  ARRAY['bovino', 'equino'],
  'https://cc.biogenesisbago.com/ar/2021/ubredem/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Synedem Over 12 frascos x 25ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_68f20a08ba334fdfbc63000ef8cebb25~mv2.png',
  'Antiedematoso, diurético, antiinflamatorio - Para Bovinos y Equinos.',
  '25ml.',
  'estimulantes, autointoxicaciones intestinales o miógenas, etc).',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.over.com.ar/product/synedem/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Estreptopenicilina Mivet 12 frascos x 25ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_b9fa8497ebe24d26a6ed013b4f82029e~mv2.png',
  'Para el control y tratamiento de infecciones con localización en aparato respiratorio, tracto urinario, gastrointestinal, reproductivo, glándula mamaria, piel - Para Bovinos, Equinos y Ovinos.',
  '25ml.',
  'Cada 1 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.laboratoriosmicrosules.com/producto/estreptopenicilina-microsules/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ceftiover Maxium Over 1 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_3c81e8d776654a4898ee1db701626075~mv2.png',
  'Antibiótico inyectable de acción prolongada que combina una cefalosporina de 3ª generación (ceftiofur) y un AINEs (meloxicam) - Esta combinación aporta un amplio espectro terapéutico por su acción antibiótica, antiinflamatoria, analgésica y antipirética - Para Bovinos.',
  '1 dosis.',
  'Ceftiofur 2 g.',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/ceftiover-maxium/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Orbenin Extra Zoetis 24 Jeringas 3,6 gr.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f817412a8fff4106abb5ac9aaca3a9a8~mv2.png',
  'Antibiótico para uso intramamario en vacas secas - Posee acción bactericida de amplio espectro, es efectivo sobre patógenos Gram positivos y Gram negativos. - Solución Inyectable - Para Bovinos.',
  '3,6 g',
  'Cloxacilina benzatínica: 0,600 g.',
  '',
  ARRAY['bovino'],
  'https://ar.zoetis.com/products/bovinos/orbenin-extra.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Novantel Lactancia Boehringer 20 Jeringas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4b62a09de9524e51af47140510bd95be~mv2.png',
  'Asociación antibiótica para el tratamientointramamario de mastitis clínica ocasionadas porgérmenes sensibles, en vacas en lactancia. - Solución Inyectable - Para Bovinos.',
  '',
  'Cloxacilina, 200 mg (como sal sódica).',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Dairy/Products/Pages/NOVANTEL%C2%AE-LACTANCIA.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ememast Plus Lactancia Boehringer 20 Jeringas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e00c8ee283a54858961d28f1224f9bf8~mv2.png',
  'Tratamiento curativo de la Mastitis subclínica y clínica(agudas y crónicas) de vacas lecheras durante lalactancia, causadas por gérmenes sensibles a laespiramicina y a la neomicina - Solución Inyectable - Para Bovinos.',
  '',
  'Espiramicina 2 g.',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Dairy/Products/Pages/EMEMAST-PLUS-%C2%AE.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Novantel Secado Boehringer 20 Jeringas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_eb5b18a3c74341d689288a7282bfa1d3~mv2.png',
  'Prevención de la mastitisproducida por gérmenes sensibles en vacas lecheras. - Solución Inyectable - Para Bovinos.',
  '',
  'Cloxacilina, 500 mg (como sal benzatínica).',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Dairy/Products/Pages/NOVANTEL%C2%AE-SECADO.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Romagel Lactancia Boehringer 20 Jeringas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2649542d08924436b7fbbdf914b46b8f~mv2.png',
  'Tratamientode mastitis clínicas y subclínicas en vacas en lactanciay vaquillonas, causadas por bacterias sensibles,incluídas las que producen beta-lactamasas. - Solución Inyectable - Para Bovinos.',
  '',
  'Lincomicina 330 mg (como clorhidrato).',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Dairy/Products/Pages/ROMAGEL%C2%AE.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilosina 20 Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_abd98652e9e64a1aab240e60c80bafab~mv2.png',
  'TILOSINA 20 es una solución estéril y estable de Tilosina al 20% lista para usar - Activo principalmente contra: gérmenes Gram positivos, ciertas Leptospiras, virus de molécula grande, algunos Gram negativos agentes PPLO - Para: Bovinos.',
  '100ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/tilosina-20/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tetradur L.A. 300 Boehringer 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_48e95c9ecbcc418ca595b1da2773d60f~mv2.png',
  'Oxitetraciclina 30%, amplio espectro y larga acción antibiótica, niveles terapeúticos - Indicada para tratar enfermedades causadas por organismos sensibles a la oxitetraciclina (bacterias Gram- y Gram+) - Es más poderoso, ya que contiene 50% más de oxitetraciclina por ml que las formulaciones de LA comunes. - Para: Bovinos.',
  '250ml.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bio Fenicol Florfenicol Bio98 100ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_95693256c5dc4467a1a90a2762c03116~mv2.png',
  'Antibiótico de amplio espectro - Para: Bovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Excede Cattle Zoetis 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_613f7f4e6f594109b59a82cfb61f8a74~mv2.png',
  'Excede es un antibiótico de amplio espectro, del grupo de las cefalosporinas, activo contra bacterias patógenas Gram + y Gram -, incluyendo a las cepas productoras de betalactamasa - El ceftiofur, es bactericida, se caracteriza por su mecanismo de acción, el cual inhibe la síntesis de la pared celular - Para: Bovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino'],
  'https://ar.zoetis.com/products/bovinos/excede-cattle.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Estreptopendiben Biogénesis Bago.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b626dbe0ca8d43808d0fc511f9213b03~mv2.png',
  'Antibiótico inyectable de amplio espectro - Asociación sinérgica bifásica de Penicilina y Estreptomicina con Dipirona y Vitamina C - antitérmico - Para: Bovinos y Equinos.',
  '',
  '',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.biogenesisbago.com/ar/productos/id78/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Emestryn Boehringer 24 ampollas.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_afeb4987d81941228184adc3eb925112~mv2.png',
  'Solución inyectable con rápida y efectiva acción antibiótica - Utilización profiláctica antes y después de las intervenciones quirúrgicas, castraciones, descole, señalada, infecciones de la pleura y peritoneo, abscesos profundos, Fiebre del transporte y Mastitis, infecciones intestinales, del tracto urinario y uterino, infecciones del oído, Neumonías y otras afecciones - Para: Bovinos, Equinos y Ovinos.',
  '',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Estreptocarbocaftiazol Biogénesis Bago 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_84e01f2249eb4ba78eb52c3d81504d99~mv2.png',
  'Antidiarreico, antiséptico, carminativo, normalizador de la flora intestinal - Para: Bovinos, Equinos y Ovinos.',
  '1l.',
  'Ftalisulfatiazol 2,5 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.biogenesisbago.com/uy/productos/id218/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Protecto Entero Pectin 900ml.',
  26902.45,
  NULL,
  'https://static.wixstatic.com/media/06b954_16474bb4cc154dca9e7677c786ae8047~mv2.png',
  'Antidiarreico, espasmolítico, protector de la mucosa, antiséptico, adsorbente de toxinas, carminativo - Poderosa acción antidiarreica que respeta la flora bacteriana normal - Crea una cubierta protectora de la mucosa irritada - Así encapsula las terminaciones nerviosas sensitivas irritadas, anulando el principal estímulo de la motilidad intestinal anormal - Para: Bovinos, Equinos y Ovinos.',
  '900ml.',
  'Bismuto subnitrato 3gr.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.laboratoriofundacion.com/uploads/5/1/8/4/51847047/pep.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Polixane Over 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2ab0de367e4941a6a25b0f107d0fc41c~mv2.png',
  'Formulación destinada a la prevención y tratamiento del meteorismo (timpanismo o empaste) de bovinos y ovinos - Cólicos y diarreas fermentativas de todas las especies - Flatulencia - Aerofagia - Distensión y dolores abdominales postoperatorios - Para: Bovinos, Equinos y Ovinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/polixane-liquido/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Terra Cortril Spray Zoetis 125ml.',
  32960,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e190f9c7a11a4ab1872e6584d258d415~mv2.png',
  'Es una especialidad farmacéutica que combina simultáneamente en un solo preparado, la acción antiinflamatoria de la Hidrocortisona, y la acción antibiótica de la Oxitetraciclina - Su aplicación en forma de spray es práctica y accesible pudiéndose repetir las veces que sea necesario - Para: Bovinos y Equinos.',
  '125ml.',
  '',
  '',
  ARRAY['bovino', 'equino'],
  'https://ar.zoetis.com/products/terra-cortril-spray.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Negasunt Polvo Bayer 1kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Bayer' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_58760b192445424d9d37ca2372c7cd03~mv2.png',
  'DISCONTINUADO - Los dos distintos larvicidas contenidos en Negasunt polvo se encargan de aniquilar los gusanos de las temidas gusaneras o miasis cutáneas - Uno de ellos posee una acción mortal relativamente rápida, mientras que el otro actúa más lentamente pero previene de un nuevo agusanamiento de la herida durante varios días después de su aplicación, manteniéndola limpia y dando tiempo para que ésta pueda curar y cicatrizar - Negasunt polvo contiene también otros ingredientes con acción bactericida y cicatrizante que contribuyen asimismo a la pronta recuperación - Para: Bovinos, Ovinos y Equinos.',
  '1kg.',
  'Coumaphos 3%.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pomada Galmetrin Biogénesis Bago 1kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1c12b50029f34f21bb7c38720aba4c99~mv2.png',
  'Larvicida externo, curabicheras en pomada de uso local para ovinos, equinos, porcinos y bovinos - Para: Bovinos, Ovinos y Equinos.',
  '1kg.',
  'Cipermetrina 2 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.biogenesisbago.com/ar/productos/id67/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overmectina Triple Over 2,5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e21d660c7b54449f8d4c817e42f81d1d~mv2.png',
  'Antiparasitario interno de amplio espectro - Indicado para el tratamiento de las parasitosis producidaspor vermes gastrointestinales y pulmonares - Fasciolicida - Para: Bovinos, Ovinos.',
  '2,5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.over.com.ar/product/overmectina-triple-oral/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bifetacel 10 Co Se Microsules 5l.',
  145510.35,
  NULL,
  'https://static.wixstatic.com/media/06b954_6f2558ab4d3c471e9659708698e3c9b7~mv2.png',
  'Antiparasitario interno de amplio espectro, adulticida, larvicida y ovicida. Indicado para el tratamiento y la prevención de Nematodes gastrointestinales y pulmonares - Para: Bovinos, Ovinos y Equinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.laboratoriosmicrosules.com/producto/bifetacel-co-se/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Super Synect Over 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_823acad77c5e4d2aab173d958a2f588e~mv2.png',
  'Antiparasitario externo - Pour on - Piojicida - Repelente de insectos - Para: Bovinos, Equinos y Ovinos.',
  '1l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/super-synect-pour-on/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overxicam Gel Equinos Over 30gr.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9b232a9917f445649651aaee7cea9ea4~mv2.png',
  'Antiinflamatorio no esteroide de uso oral para equinos - Esta indicado para aliviar el dolor y la inflamación en trastornos locomotores y musculoesqueléticos agudos y crónicos; dolor asociado a cólicos; analgesia pre y post quirúrgica. - Para: Equinos.',
  '30g',
  'Cada 100 ml contiene:',
  '',
  ARRAY['equino'],
  'http://www.over.com.ar/product/overxicam-gel-equinos/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overmectina Total Equinos Over 10gr.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a33e9c0183e14721a46b38aefe282ffa~mv2.png',
  'Antiparasitario interno a base de Ivermectina al 1,2% y Praziquantel 15% - Amplio espectro para el control de parasitosis internas y externas - Sabor manzana - Alta palatabilidad - Para: Equinos.',
  '10g',
  'Cada 100 g contiene:',
  '',
  ARRAY['equino'],
  'http://www.over.com.ar/product/overmectina-total-equinos/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vermectin Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_37cb9fc4faef4dcebd85c4e7aae4257e~mv2.png',
  'Endectocida inyectable para bovinos, destinado al tratamiento y control de parasitosis externas e internas - Para: Bovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/vermectin/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Doramic AD3E Microsules 500ml.',
  68365,
  NULL,
  'https://static.wixstatic.com/media/06b954_e5f31a41db7c40f984aa829f320820ca~mv2.png',
  'Antiparasitario de amplio espectro contra endo y ectoparásitos (endectocida) con vitaminas A, D3 y E- Para: Bovinos y Ovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.laboratoriosmicrosules.com/producto/doramic-ad3e/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cincha Azoxi Pro Zamba 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4cb99f60546f4f7f8990353194f43d82~mv2.png',
  'Fungicida para utilizar en soja, maíz, sorgo, trigo cebada cervecera, maní, poroto y ajo - Posee acción sistémica, mesostémica y translaminar para el control de enfermedades foliares - Azoxistrobina + Cyproconozale.',
  '5l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Clorpirifos Zamba 20l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1eed871f5d024a9d9feea46407f24e28~mv2.png',
  'Insecticida-acaricida Clorpirifos Zamba, compuesto órgano fosforado que actúa por contacto, ingestión e inhalación, siendo eficaz contra insectos chupadores y masticadores.',
  '20l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Apero Lambda 25% CS Zamba 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_562b5a7073db41a38c6c4512943a78da~mv2.png',
  'Insecticida piretroide de amplio espectro - Actua especialmente sobre larvas de lepidópteros - Posee buen poder de volteo, residualidad y propiedades repelentes.',
  '5l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dicamba Zamba 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_aa93b814193a4a74af44d66363932a32~mv2.png',
  'Herbicida postemergente sistémico selectivo que se absorbe por hojas y raíces, trasladándose vía floemática y xilemática - Controla malezas de hoja ancha resistentes a 2,4-D o MCPA - Puede utilizarse solo o en mezclas con otros herbicidas sobre diferentes cultivos en distintos estados de desarrollo.',
  '5l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Paraquat Zamba 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_73a62eb278084e80a853ac2dfc8ba6fe~mv2.png',
  'Herbicida, defoliante y desecante.Actúa sólo por contacto, de forma rápida y enérgica sobre el follaje, sin afectar tallos de corteza marrón.',
  '5l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'S-Metolacloro Zamba 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_80e50d4fca564351abefa416e02095eb~mv2.png',
  'Herbicida preemergente de acción sistémica - Controla amplio espectro de malezas de hojas angostas y anchas - Selectivo para cultivos de maíz, soja, girasol, hortícolas y sorgo granífero (tratado con antídoto).',
  '5l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bajador Haloxi 12% Zamba 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5c6d7b69a5d942658f0537e2904c91c5~mv2.png',
  'Herbicida postemergente de acción sistémica selectivo para cultivos de girasol, maní, poroto, soja y algodón - Controla malezas gramíneas perennes y anuales - Detienen su crecimiento inmediatamente después de la aplicación - En los rizomas destruye inicialmente las yemas y luego el tejido se necrosa - Posee alta capacidad de penetración por el follaje.',
  '5l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Atrazina Zamba 20l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a44bdd182cb14e64b153f5c405222761~mv2.png',
  'Herbicida selectivo: controla malezas de hoja ancha y pastos anuales (gramíneas) en cultivos de: caña de azúcar, maíz, sorgo granífero - Actúa por translocación y es de acción residual - Herbicida a base de Atrazina, presenta ventajas como: suspensión líquida, flotable que permite la medición fácil y segura de las dosis.',
  '20l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  '2,4 D Amina Zamba 20l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a6bd75a20c274eb69c1f32676460c625~mv2.png',
  'Herbicida efectivo, de acción sistémica y de baja volatilidad - Destinado al control eficaz de malezas de hoja ancha en determinados cultivos - Se recomienda emplearlo en zonas críticas, donde la volatibilidad de los selectivos corrientes (esteres del ácido 2,4D) pueda alcanzar a cultivos hortícolas, forestales y florales cultivados en la proximidad.',
  '20l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  '2,4-D Zamba 20l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_eeacb80607304bddb4f339d3c5a054a9~mv2.png',
  'Combate las malezas, actuando selectivamente por la absorción de las hojas, de su principio activo, el éster butílico del 2,4 D - La susceptibilidad de las malezas al producto está relacionada al estado de crecimiento de las mismas, debiendo aplicarse mayor dosis cuanto más avanzado sea el desarrollo de las mismas.',
  '20l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  '2,4 DB Zamba 20l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0abecc7f609d4b599e5dab65a6fd470a~mv2.png',
  'Herbicida selectivo sistémico para el control de malezas de hoja ancha, en cultivos de alfalfa, maní y pasturas mixtas o consociadas formadas por leguminosas.',
  '20l.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Maxi Allflex sin numeración 25u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c60c24b7269947cfb0c5c376146a342b~mv2.jpg',
  'Caravanas para identificar su ganado en forma eficiente - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Grande Allflex sin numeración 25u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0a0dea73fe4a4e42bf3bd27d388097d5~mv2.jpg',
  'Caravanas para identificar su ganado en forma eficiente - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Mediana Allflex sin numeración 25u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_208dc0afaa044b7cad1f4fa89973c686~mv2.jpg',
  'Caravanas para identificar su ganado en forma eficiente - Para: Ovinos.',
  '',
  '',
  '',
  ARRAY['ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pinza Aplicador de Caravanas Allflex',
  42620.9,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d3d18f4c9e0d4533b4dec1ad5cc40b7e~mv2.png',
  'Aplicador de Caravanas.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Señalador de Oreja Sharp Vet.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4baaf58d59f043dca1e34b3de198cac1~mv2_d_4896_3264_s_4_2.png',
  'Señalador de Oreja. Preguntar disponibilidad y opciones.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pasta verde para Tatuar Kemco 28g.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_9f63e03be0a44f5fb9fe486972b12a81~mv2.png',
  'Pasta para tatuar verde.',
  '28g.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Energizador de Alambrados Plyrap 40km 12V.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_cea5c70963244b1790ed5b0a0bea8ad4~mv2.png;06b954_d2e64096e16e44c8b21c96d85990f7ab~mv2.jpg',
  'Energizador de Alambrados Plyrap - Alcance en línea recta 1.2km - Funciona a 12 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador 220V 60km Mandinga C250.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_a403ddcc86b94de58d8a095c03dcc546~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga C250 - Desde pequeñas superficies hasta 600 has electrificadas en forma segura. Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador Dual 120km Mandinga CB600.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_64244f1d2ab04957917a04a3e06e807b~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga CB600 - Desde pequeñas superficies hasta 1000 has electrificadas en forma segura. Funciona a 12-220 V. No incluye Batería.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador 220 V 120km Mandinga C600.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2b1856b8fd444a35872c9fe90bb35172~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga C600 - Desde pequeñas superficies hasta 1000 has electrificadas en forma segura. Funciona a 220 V.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador Dual 60km Mandinga CB250.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_c29d2d61cc104ca99f9c81e3967acde1~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga CB250 - Desde pequeñas superficies hasta 600 has electrificadas en forma segura. Funciona a 12-220 V. No incluye Batería.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador Dual 40km Mandinga CB120.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2618e84b2f8d40ee8bf7691740295e1c~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga CB120 - Desde pequeñas superficies hasta 300 has electrificadas en forma segura. Funciona a 12-220 V. No incluye Batería.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador a Batería 12V 120km Mandinga B600.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_a612c4c3146c437398778d94a4c4bbc1~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga B600 - Desde pequeñas superficies hasta 1000 has electrificadas en forma segura. Funciona a 12-36 V. - No incluye batería.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador a Batería 12V 60km Mandinga B250.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8d7d075742074ecaba4cfcfcd30c7e5c~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga B250 - Desde pequeñas superficies hasta 600 has electrificadas en forma segura. Funciona a 12V - No incluye batería.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alambre de Manea N° 8, 9 o 10 x 25 kg.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2217f562a3f941e996305b0e84af2350~mv2_d_4896_3264_s_4_2.png',
  'Alambre de Manea - Diámetros: 8= 4.06mm- 9= 3.65mm- 10= 3.25mm.',
  '25 kg.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alambre Galvanizado 16/14 Alta Resistencia 1km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_571c4e8bf9574dcd87ff927311c4bfe3~mv2_d_4896_3264_s_4_2.png',
  'Alambre Galvanizado.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Respi 8 Querato Providean Tecnovax 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_102437863d0c4f63abbfe0181f053701~mv2.png',
  'Respi 8 Querato es la vacuna más completa para la prevención de las Enfermedades Respiratorias Bovinas (ERB) y Queratoconjuntivitis Infecciosa Bovina (QIB) - Estas enfermedades son particularmente agresivas en los animales jóvenes, causando pérdidas de hasta 30 kg en cada animal afectado por ambas enfermedades - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-respi-8-querato-2/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Jeringa Automática Fix Master Plus 50c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_7dd6ed5266724184b9cf9273175bacd3~mv2_d_4896_3264_s_4_2.png',
  'Administración precisa y rápida, con rango de dosificación ajustable - La Jeringa Automática Fix evita errores en la aplicación y dosificación de substancias que requieren precisión.',
  '50c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Autodosificadora Lider Matic 20c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_7af1cf81c8844cae901c417365078986~mv2.png',
  'Equipado con tirafondo para ser emplead con bidones de 5 a 10 litros - Posee un cuerpo de plástico reforzado totalmente resistente a productos pour on y se puede utilizar como jeringa intraruminal, como dosificador oral y jeringa para inyectar, siempre empleando los accesorios específicos en sus distintos usos.',
  '20c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Diarrea Neonatal CDV 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'CDV' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0a09f275bf9241cab17ae90e41b6c745~mv2.png',
  'Preventivo de cuadros clínicos de diarrea neonatal causados por la infección con Rotavirus y Coronavirus y enfermedades entéricas producidas por Escherichia coli y Salmonella - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.cdv.com.ar/index.php/2015/07/vacuna-anti-diarrea-neonatal/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tipertox Brouwer 145ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Brouwer' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_54a2961eca0647fe83af9ee41c89bc7e~mv2.png',
  'Antisárnico, piojicida y mosquicida - Para: Bovinos y Equinos',
  '145ml.',
  'Cipermetrina 5,6 g.',
  '',
  ARRAY['bovino', 'equino'],
  'http://brouwer.com.ar/productos/tipertox/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Yodacalcio B12 D Chinfield 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Chinfield' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d3c02deb7e3143f4b72b4d5f80acec0f~mv2.png',
  'Suplemento mineral vitamínico indicado cuando se necesite incrementar la provisión de minerales y vitaminas en casos de, hipocalcemia, hipofosfatemia, hipomagnesemia hipotiroidismo, debilidad, paresia puerperal, disminución de fertilidad - Coadyuvante en carencias minerales vitamínicas durante la preñez, lactancia, crecimiento, engorde, convalecencias, pre-parto y pre-servicio, pre y postdestete - Para: Bovinos.',
  '250ml.',
  'Gluconato de calcio. 18.7 g.',
  '',
  ARRAY['bovino'],
  'http://www.chinfield.com/vademecum-items/yodacalcio-b12-d-2/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Mediana Allflex con numeración 25u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0223f5d345aa4d93851380c49602bdea~mv2_d_4896_3264_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Para: Ovinos.ESPECIFICAR NUMEROS AL FINAL DE LA COMPRA',
  '',
  '',
  '',
  ARRAY['ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Grande Allflex con numeración 25u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_95712cc914cd478ba0561c71ff8d438a~mv2_d_4896_3264_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Para: Bovinos.ESPECIFICAR NUMEROS AL FINAL DE LA COMPRA',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Maxi Allflex con numeración 25u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_212cc948888b4769bc905d260d1f2ceb~mv2_d_4896_3264_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente - Para: Bovinos.ESPECIFICAR NUMEROS AL FINAL DE LA COMPRA',
  '',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravanas Insecticidas Synect-dc Over 40% 100u.',
  497.5,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9f413da508264e1ba51e052aa9f1e9ed~mv2_d_4896_3264_s_4_2.png',
  'Antiparasitario externo para uso en bovinos. Indicado para el control y tratamiento de infestaciones por Haematobia irritans (mosca de los cuernos). - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  'Soy una política de devolución y reembolso. Una oportunidad ideal para explicarles a tus clientes qué hacer en caso de no estar satisfechos con su compra. Al ofrecerles una política de reembolso clara y sencilla, generas confianza y credibilidad en tus clientes, pues saben que en tu tienda pueden realizar compras con altos niveles de seguridad.',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravanas Diazinón Over 40% 100u. C',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_da834a2fffb64ea58ca5f0ad066693d6~mv2.png',
  'Antiparasitario externo. Indicado para el control y tratamiento de infestaciones por Haematobia irritans (mosca de los cuernos) - Para: Bovinos.',
  '',
  '',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/caravanas-diazinon-40/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Caravana Botón Allflex 25u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Allflex' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bef76a9e27434f15b9ccc116a1c42385~mv2_d_4896_3264_s_4_2.png',
  'Caravanas para identificar su ganado en forma eficiente. - Para: Bovinos, Ovinos y Equinos.',
  '',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Toram Nufarm 5lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_edc3681adf424e83861b828e54438a2d~mv2_d_4896_3264_s_4_2.png',
  'Toram NF es un herbicida postemergente sistémico de acción hormonal para el control de malezas de hoja ancha, anuales y perennes, en cereales, caña de azúcar, lino y praderas de gramíneas - Se absorbe por vía radicular y foliar, se traslada por floema y xilema - Actúa como una hormona vegetal (Auxinas) que impide la síntesis de proteínas sobre las zonas de crecimiento de la planta, afectando el normal desarrollo de las mismas y provocando su muerte.',
  '5lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Reg-Sec IV 20lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9d35f313e2ff47b181977f28586469b7~mv2_d_4896_3264_s_4_2.png',
  'Reg-Sec IV simplifica al máximo los controles de aplicación - Su presentación es de un color rojo oscuro y su naturaleza ácida, agregado al agua dura vira a un color amarillo intenso - Para comodidad del usuario hemos establecido una escala de aplicaciones por color, basadas en el pH original del agua a emplear.',
  '20lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Power Plus/ Glifosato Full II 20lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ecaaf0c08a8b4bde830b083c5b89c8e6~mv2_d_4896_3264_s_4_2.png',
  'Herbicida no selectivo para el control post-emergente de las malezas anuales y perennes - Es de acción sistémica, se absorbe por las hojas y tallos verdes - Inhibe la síntesis de aminoácidos aromáticos.',
  '20lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pastar Dow 5lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_439987cb3c2f47dca3c18f0b11b65653~mv2_d_4896_3264_s_4_2.png',
  'REEMPLAZADO POR EL PASTAR GOLD.Pastar es un herbicida selectivo y sistémico, recomendado para el control de malezas de hoja ancha de porte herbáceo, semi-arbustivo y arbustivo, en áreas de pasturas de gramíneas - Sus principios activos son Aminopyralid y Fluroxypyr.',
  '5lt.',
  '',
  '',
  ARRAY[]::text[],
  'https://www.camponuevosrl.com/product-page/pastar-gold-dow-5lt-consultar-precio',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Nufuron Metsulfuron Nufarm 100g.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_146c4859f38f4b34b16abfca3bd243db~mv2_d_4896_3264_s_4_2.png',
  'Nufuron es un herbicida selectivo postemergente para el control de malezas latifoliadas en cereales de invierno (trigo y cebada principalmente) - Posee acción sistémica y residual y su modo de acción es mediante la inhibición de la división y crecimiento celular (ALS) de las malezas latifoliadas - Nufuron es un herbicida muy activo en malezas pequeñas, en crecimiento - Es absorbido a través del follaje y raíces de las plantas, inhibiendo el crecimiento.',
  '100g.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Navajo Nufarm 5kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c8f3b380a0a3460ba97152f5c8b10003~mv2_d_4896_3264_s_4_2.png',
  'Navajo es un herbicida selectivo sistémico y de acción hormonal para el control de malezas de hoja ancha en determinados cultivos - Posee la concentración de sal y ácido más alta del mercado - Al ser una sal Amina del ácido 2,4 D, es de muy baja volatilidad pudiendo ser aplicado en zonas donde el 2,4 D Ester (por su volatilidad) está prohibido, o en lotes con cultivos vecinos sensibles al 2,4D - Formulado como polvo soluble, posee una granulometría similar al grano de arena que lo diferencia del resto de los 2,4D del mercado, disminuyendo sustancialemente el olor.',
  '5kg.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Lontrel Dow 5lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c6a82e04932e43e1971fd7555b3cc1b0~mv2_d_4896_3264_s_4_2.png',
  'Lontrel es un herbicida selectivo sistémico de acción hormonal que se aplica en postemergencia.',
  '5lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Lero-Wett Lero Técnica 20lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_049e10e1c9b0439fb30be250c35748f3~mv2_d_4896_3264_s_4_2.png',
  'Lero-Wett es un humectante higroscópico de gran versatilidad, actúa sobre las tensiones superficiales permitiendo una buena cobertura de las superficies tratadas - Favorece la penetración de los principios activos herbicidas en las malezas, mejorando su eficiencia e incrementando su acceso a los Sitios Activos.',
  '20lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Lero-Wett Lero Técnica 5lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d159ee297ae34e07974c23af405b8eb7~mv2_d_4896_3264_s_4_2.png',
  'Lero-Wett es un humectante higroscópico de gran versatilidad, actúa sobre las tensiones superficiales permitiendo una buena cobertura de las superficies tratadas - Favorece la penetración de los principios activos herbicidas en las malezas, mejorando su eficiencia e incrementando su acceso a los Sitios Activos.',
  '5lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Lero-Wett Lero Técnica 1lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f39cb52d6f5146eda03bb1861f4fcf4e~mv2_d_4896_3264_s_4_2.png',
  'Lero-Wett es un humectante higroscópico de gran versatilidad, actúa sobre las tensiones superficiales permitiendo una buena cobertura de las superficies tratadas - Favorece la penetración de los principios activos herbicidas en las malezas, mejorando su eficiencia e incrementando su acceso a los Sitios Activos.',
  '1lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Kamba Nufarm 5lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b1cb7a28d6784414af5ae94ad4824208~mv2_d_2736_1824_s_2.png',
  'Kamba es un herbicida hormonal postemergente de acción sistémica, foliar y selectiva en cultivos de gramíneas para el control de malezas de hoja ancha resistentes al 2,4 D o MCPA - Se absorbe a través de las hojas y raíces traslocándose con facilidad a todos los órganos de la planta a través de ﬂoema y xilema, controlando totalmente la maleza.',
  '5lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Glifosato II Atanor 20lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ef12a99ab3154be48fba3a8eda698a1f~mv2_d_4896_3264_s_4_2.png',
  'Herbicida no selectivo para el control post-emergente de las malezas anuales y perennes - Es de acción sistémica, se absorbe por las hojas y tallos verdes - Inhibe la síntesis de aminoácidos aromáticos.',
  '20lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Glifomax NG Zamba 10kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_39724c261c81445a81cd7f42377d4440~mv2_d_4896_3264_s_4_2.png',
  'Herbicida selectivo post-emergente de acción sistémica que controla malezas de hoja ancha - Se absorbe por las hojas y las raíces, trasladándose a toda la planta a través del sistema vascular - Regulador de crecimiento (imitador de auxinas).',
  '10kg.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dicamba Atanor 10lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7502e1d647ac4c5fbb1bebe20021af76~mv2_d_4896_3264_s_4_2.png',
  'Herbicida selectivo post-emergente de acción sistémica que controla malezas de hoja ancha - Se absorbe por las hojas y las raíces, trasladándose a toda la planta a través del sistema vascular - Regulador de crecimiento (imitador de auxinas).',
  '10lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Credit Amonio Glifosato Nufarm 20lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_2def28464ae0443e9d8ac028f6f21975~mv2_d_4896_3264_s_4_2.png',
  'Credit Amonio es un herbicida no selectivo para el control postemergente de malezas anuales y perennes en áreas agrícolas, industriales, caminos y vías férreas - Posee acción sistémica, es absorbido por hojas y tallos verdes y traslocado hacia las raíces y órganos vegetativos subterráneos, ocasionando la muerte total de las malezas emergidas - Los efectos son lentos, sobre todo en las especies perennes, donde después de transcurridos 4-5 días desde la aplicación comienza el amarillamiento y marchitamiento de hojas y tallos que culminan con la muerte total de las malezas.',
  '20lt.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Atrazina 90 Nufarm 10kg.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f1b36acdb2b242318d849ddb5e341e4d~mv2_d_4896_3264_s_4_2.png',
  'Atrazina 90 WG Nufarm es un herbicida selectivo sistémico y residual, para el control de malezas en cultivos de Maíz, Sorgo granifero y Caña de azúcar - Se puede usar en tratamiento preemergencia y postemergencia, controlando malezas de hoja ancha y algunas gramíneas e impidiendo su crecimiento durante varios meses - El producto es absorbido por las raíces y las hojas de las malezas, inhibiendo el proceso de fotosíntesis, provocando la clorosis y muerte de las malezas, minimizando la competencia de estas con el cultivo.',
  '10kg.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Clorpirifos Nufarm 20lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a1e179529f944c17a056ea70223bcd61~mv2_d_4896_3264_s_4_2.png',
  'Clorpirifos Nufarm es un insecticida perteneciente a la familia de los Organofosforados, con acción sobre el sistema nervioso del insecto, siendo un producto efectivo para el control de insectos chupadores y masticadores en cultivos extensivos e intensivos - Posee acción por contacto, ingestión e inhalación - Afecta el sistema nervioso central mediante la inhibición de la enzima Acetilcolinestersa, produciendo la acumulación de Acetilcolina, dando como resultado una sobrestimulación de los músculos seguido de la muerte del insecto.',
  '20lt.',
  '',
  '',
  ARRAY[]::text[],
  'Soy una política de devolución y reembolso. Una oportunidad ideal para explicarles a tus clientes qué hacer en caso de no estar satisfechos con su compra. Al ofrecerles una política de reembolso clara y sencilla, generas confianza y credibilidad en tus clientes, pues saben que en tu tienda pueden realizar compras con altos niveles de seguridad.',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cipermetrina Nufarm 20lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agroquímicos' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8801242c3c6348a59106e940eb54f20c~mv2_d_4896_3264_s_4_2.png',
  'Cipermetrina Nufarm es un insecticida perteneciente a la familia de los Piretroides, con acción sobre el sistema nervioso del insecto, siendo un producto efectivo para el control de plagas insectiles como lepidópteros, coleópteros y trips - Posee acción por contacto, ingestión e inhalación - Afecta el sistema nervioso central mediante la inhibición de la enzima Acetilcolinestersa, produciendo la acumulación de Acetilcolina, dando como resultado una sobrestimulación de los músculos seguido de la muerte del insecto.',
  '20lt.',
  '',
  '',
  ARRAY[]::text[],
  'Soy una política de devolución y reembolso. Una oportunidad ideal para explicarles a tus clientes qué hacer en caso de no estar satisfechos con su compra. Al ofrecerles una política de reembolso clara y sencilla, generas confianza y credibilidad en tus clientes, pues saben que en tu tienda pueden realizar compras con altos niveles de seguridad.',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Guantes de Látex Largos Verdes Krutex 100u.',
  16446,
  NULL,
  'https://static.wixstatic.com/media/06b954_bd929eb3d88c4fe7815e8e866a9edbdc~mv2.png',
  'Guantes de Látex examinación.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Guantes de Látex Cortos Dexal 100u.',
  3430.35,
  NULL,
  'https://static.wixstatic.com/media/06b954_f5b7c9df3ae14e4d84456df23e795ae5~mv2.png',
  'Guantes de Látex.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Electrificador a Batería 12V 40km Mandinga B120.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_62ae8e3cd8be487d9f152fd528ae57e4~mv2.png;06b954_c54acac3f5e743ac85bf134166b755a8~mv2_d_4896_3264_s_4_2.png',
  'Energizador de Alambrados Mandinga B120 - Desde pequeñas superficies hasta 300 has electrificadas en forma segura - Funciona a 12V - No incluye batería.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cable Electroplástico Arriero 9 hilos 500mts.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_0283e98aa5b948d9bb83ab937b6b5596~mv2.png',
  'Cable Electroplástico 9 Hilos.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Barra Paintstick U.S.A. c/u.',
  3450,
  NULL,
  'https://static.wixstatic.com/media/06b954_12a3479df52949fd9da0cc8b772980fc~mv2.png',
  'Barra Paintstick Tiza U.S.A.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alambre Galvanizado 3.25mm 380m.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_2217f562a3f941e996305b0e84af2350~mv2_d_4896_3264_s_4_2.png',
  'Alambre Galvanizado - Diámetro: 3.25mm.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Alambre Galvanizado 17/15 1km.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_571c4e8bf9574dcd87ff927311c4bfe3~mv2_d_4896_3264_s_4_2.png',
  'Alambre Galvanizado.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Trebol Blanco GAPP 20kg.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4ae810e370b8495d8192c5f442908504~mv2_d_4896_3264_s_4_2.png',
  'Trebol Blanco.',
  '20kg.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Sorgo Forrajero Sudan 25kg.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_b6785922006a43efb87627b7b1482536~mv2_d_4896_3264_s_4_2.png',
  'Sorgo Forrajero Palo Verde.',
  '25kg.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Viral Reproductiva CDV 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'CDV' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b2fa90fc82824e248b9387ca3444bdf5~mv2.png',
  'Preventivo de cuadros respiratorios y reproductivos (infertilidad, aborto y muerte perinatal) producidos por los virus de IBR y BVD y bacterias del género Leptospira,Campylobacter y Haemophilus somnus. - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Viral Feedlot CDV 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'CDV' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_42dc919b557840aa83d2488216e355c2~mv2.png',
  'Preventivo de cuadros respiratorios y oculares producidos por los virus de IBR, BVD y PI3 y las bacterias asociadas - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Clostridial Polivalente Bovino Lanar Tradicional CDV 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'CDV' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_89873208602a41278da4b9b2f2c23c32~mv2.png',
  'Preventivo de Mancha, Gangrena gaseosa, Enterotoxemia, Hepatitis necrótica, Edema maligno y Muerte súbita - Para: Bovinos y Ovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Rotatec J5 Biogénesis Bago 80 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_cd5d0b3c78da4f9f9115c9f3dc4b8200~mv2.png',
  'Vacuna para la prevención del síndrome de la diarrea neonatal del ternero causado por Rotavirus bovino y bacterias Gram negativas - Endotoxemias secundarias a infecciones por bacterias Gram negativas y mástitis por coliformes en vacas de tambo - Para: Bovinos.',
  '80 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.biogenesisbago.com/uy/productos/id176/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Biopoligen HS Respiratoria Biogénesis Bago 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_298388ceedc24b8e92457ea1497f931e~mv2.png',
  'Vacuna para la prevención del Síndrome Respiratorio en bovinos (Complejo de enfermedades respiratorias/ Fiebre del Transporte/ Neumonía) y cuadros reproductivos, neurológicos y entéricos asociados a la acción individual o combinada de los virus y bacterias presentes en la composición - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bioabortogen H (Reproductiva) Biogénesis Bago 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9533c04709e14e1fbf5dd7e4169a2c16~mv2.png',
  'Vacuna para la prevención de enfermedades que provocan infertilidad y abortos en bovinos, ocasionados por los microorganismos presentes en la composición - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bioclostrigen J5 MGE Triple Biogénesis Bago 60 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e1e6681441ce4c918a00d56371d5786e~mv2.png',
  'Vacuna para la prevención de cuadros de mancha y gangrena gaseosa producidas por Clostridium chauvoei y C. septicum, y enterotoxemias producidas por C. perfringens tipos C y D - Contribuye a la prevención de cuadros entéricos o sistémicos producidos por toxinas de bacterias Gram negativas - Para: Bovinos y Ovinos.',
  '60 dosis.',
  '',
  '',
  ARRAY['bovino', 'ovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Respiratoria Providean Tecnovax 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4c56eacf6d554a989e69a2560f3f5512~mv2.png',
  'Las enfermedades respiratorias y nerviosas bovinas, también conocidas como ERB, ocasionan enormes pérdidas en las explotaciones ganaderas con brotes generalmente masivos en los animales más jóvenes. Infecciones virales y bacterianas que desencadenan la enfermedad, también pueden generar complicaciones neurológicas y comprometer la viabilidad de la preñez en animales gestantes. - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-respiratoria/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Repro 12 Providean Tecnovax 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_af30e9dc72714e00a549f5d67ce51723~mv2.png',
  'Vacuna con 12 antígenos virales y bacterianos para prevenir las principales enfermedades abortigénicas en bovinos - Providean Repro 12, es una vacuna polivalente compuesta por doce antígenos virales y bacterianos para contribuir en la prevención de abortos y fallas reproductivas, de etiología infecciosa, en animales reproductores - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-repro-12/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Reproductiva Providean Tecnovax 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6f2a457b7c7e4c87a0b11c527f0888cb~mv2.png',
  'Más terneros, con los mismos vientres - Vacuna contra el síndrome reproductivo en bovinos - Más de la mitad de los abortos y fallas reproductivas en bovinos se deben a causas infecciosas - Providean Reproductiva previene infecciones ayudándolo a producir más terneros cada año - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-reproductiva/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Entero Plus 7 Diarrea Neonatal Providean Tecnovax 50 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_35051f51026045339fc4dd9e6069c7c1~mv2.png',
  'Providean Entero Plus 7 es la primera vacuna del mercado que incluye en su fórmula siete antígenos virales y bacterianos para contribuir en la prevención de la DNT. - Para: Bovinos.',
  '50 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-entero-plus-7/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Clostridial Polivalente 8 Providean Tecnovax 60 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b35861f220e2486880de60e428551498~mv2.png',
  'Si conoce las consecuencias de las enfermedades clostridiales, no quiere mancharse nuevamente con ninguna de ellas - Providean Clostridial 8 protege contra la mayor cantidad de clostridios circulantes a campo - Para: Bovinos.',
  '60 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-clostridial-8/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Carbunclo Providean Tecnovax 125 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ddf207e384cd44ccbbea9ba0159eaaae~mv2.png',
  'Vacuna contra el Carbunclo Bacteridiano - El anthrax es una enfermedad mortal causante de enormes pérdidas en la producción animal y una amenaza para el personal del establecimiento - Las bacterias esporuladas tienen la capacidad de permanecer viables por años en el medio ambiente, diseminando la enfermedad - Para: Bovinos.',
  '125 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-carbunclo-bacteridiano/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Brucelosis Providean Tecnovax 12 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Tecnovax' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f70074bd536d4e2a841cf0d108782dce~mv2.png',
  'Vacuna liofilizada contra la Brucelosis Bovina - Brucella abortus Cepa 19 - Para: Bovinos.',
  '12 dosis.',
  '',
  '',
  ARRAY['bovino'],
  'https://tecnovax.com/producto/providean-brucelosis/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Jeringa Lider Dial 50c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_962c775c6eb44e578511afc748c1320b~mv2.png',
  'Jeringa de cuerpo Plástico - Sistema Dial para una simple graduación, garantiza una dosis exacta en cada aplicación.',
  '50c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pistola Dosificadora Automática Lider 50c.c.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_b7583d01880c4c8faa314279ad6653db~mv2.png',
  'Pistola Dosificadora Automática de cuerpo metálico y tubo de vidrio - Sistema simple de graduación, garantiza una dosis exacta en cada aplicación.',
  '50c.c.',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Agujas Hipodérmicas Cono Verde Neojet 100u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_1610c2b52ac04e4eb10463c75ce31050~mv2.png',
  'Agujas hipodérmicas Descartables - Estéril (Oxido de Etileno) - Libre de Pirógenos - Atóxica.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Agujas Hipodérmicas Cono Rosa Neojet 100u.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4ddbfab7d4574c0cb396119dce737f1a~mv2.png',
  'Agujas hipodérmicas Descartables - Estéril (Oxido de Etileno) - Libre de Pirógenos - Atóxica.',
  '',
  '',
  '',
  ARRAY[]::text[],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Yodacalcio B12 D Chinfield 500ml.',
  21957.55,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Chinfield' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d3c02deb7e3143f4b72b4d5f80acec0f~mv2.png',
  'Suplemento mineral vitamínico indicado cuando se necesite incrementar la provisión de minerales y vitaminas en casos de, hipocalcemia, hipofosfatemia, hipomagnesemia hipotiroidismo, debilidad, paresia puerperal, disminución de fertilidad - Coadyuvante en carencias minerales vitamínicas durante la preñez, lactancia, crecimiento, engorde, convalecencias, pre-parto y pre-servicio, pre y postdestete - Para: Bovinos.',
  '500ml.',
  'Gluconato de calcio. 18.7 g.',
  '',
  ARRAY['bovino'],
  'http://www.chinfield.com/vademecum-items/yodacalcio-b12-d-2/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vitaminas A-D-E Zoetis 100ml.',
  57515,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e6b059fd5469404e8ade35979c8717a8~mv2.png',
  'Shock vitamínico inyectable estable listo para usar y absolutamente estéril - Indicado para prevenir o tratar estados carenciales, promover el crecimiento de animales jóvenes, incrementar la producción, mejorar la conversión alimenticia, aumentar el índice de fertilidad, mejorar el rendimiento de reproductores o animales de carrera y como complemento de la medicación destinada a tratar enfermedades infecciosas - Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Vitamina A: 25 millones U.I.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://ar.zoetis.com/products/vitaminas-a-d-e.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Suplenut Biogenesis Bago 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_0ef784e620ec4afd9d876f90ffb08d90~mv2.png',
  'Es una solución inyectable de Cobre (Cu) y Zinc (Zn), para corregir y evitar las deficiencias de estos microelementos que se manifiestan en los bovinos en vastas zonas del país - Para: Bovinos y Ovinos.',
  '500ml.',
  'Cobre (como Edetato), 1,5 g.',
  '',
  ARRAY['bovino'],
  'http://www.biogenesisbago.com/ar/productos/id93/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Selfos Plus Agro Insumos 500ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_a22e30944a5e471fa44e78a15f7a3bcb~mv2.png',
  'Prevención y tratamiento de estados carenciales de Selenio, Fósforo, Vitamina A,D,E, osteomalacia y raquitismo - Reduce el recuento de células somáticas en la leche producida - Aumenta la salud de la ubre - Provoca un significativo aumento de peso ante el perfeccionamiento del anabolismo - Mejora las defensas a infecciones virales y bacterianas - Para: Bovinos y Ovinos.',
  '500ml.',
  'Selenito de Sodio0,347 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.laboratoriosagroinsumos.com/pdf-productos/selfos-plus.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Nutrimin Richmond 530ml.',
  29923.2,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8f9207fa96914e838a2205ae1eb9bbae~mv2.png',
  'Suplemento nutricional inyectable - Para: Bovinos y Ovinos.',
  '530ml.',
  'Calcio, cloruro: 0,014 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=4&amp;id=26&amp;pg=1',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Magnecal Plus Zinc Agro Insumos 500ml.',
  16797.3,
  NULL,
  'https://static.wixstatic.com/media/06b954_c2c15f2479f343e5b9d34e47e37f9c43~mv2.png',
  'Prevención y tratamiento de podopatías originadas por debilitamiento cutáneo - Prevención y/o tratamiento de “Tetania de los avenales” - Coadyuvante en la respuesta a enfermedades infecciosas y prevención de queratoconjuntivitis - Para: Bovinos y Ovinos.',
  '500ml.',
  'Dextronato de Magnesio16,79 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.laboratoriosagroinsumos.com/pdf-productos/magnecal-zinc.pdf',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Glypondin 4 Multimineral Konig 500ml.',
  54568.45,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_90410d05e1b64ca293f88552240aacb1~mv2.png',
  'Suplemento multimineral inyectable - Preventivo y curativo en casos de deficiencias de zinc, cobre, manganeso, y selenio en bovinos - Optimiza la producción, la función reproductiva y el sistema inmune - Para: Bovinos.',
  '500ml.',
  'Cada 100 mL contiene:',
  '',
  ARRAY['bovino'],
  'http://www.koniglab.com/producto/glypondin-4-multimineral/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Glypondin Konig 248ml.',
  16419.85,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9a2827a780aa460494630477e3667a9a~mv2.png',
  'Emulsión de cobre de liberación prolongada para el tratamiento de la hipocuprosis - Tratamiento de estados carenciales de cobre. Curativo y preventivo en zonas de hipocuprosis endémica - Para: Bovinos.',
  '248ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.koniglab.com/producto/glypondin/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Gluforal M.F. 500 Rosenbusch 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rosenbusch' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_afb0b0d6b5194573a2845e7ccfd69dee~mv2.png',
  'Mineralizante indicado para el tratamiento de hipocalcemia, hipomagnesemia, hipofosfatemia, tetania y acetonemia en bovinos - Para: Bovinos.',
  '500ml.',
  'Calcio gluconato 15 g.',
  '',
  ARRAY['bovino'],
  'http://www.rosenbusch.com/argentina/gprodfarm_vitam.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Gluconato de Calcio Magnesiado Rosenbusch 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Rosenbusch' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_361f83d0b0ac48eab65154f6a7491a16~mv2.png',
  'Calcificante indicado para el tratamiento de hipocalcemias e hipomagnesemias - Para: Bovinos, Equinos y Ovinos.',
  '250ml.',
  'Calcio gluconato 50 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.rosenbusch.com/argentina/gprodfarm_vitam.html',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'CM22 Von Franken 500ml.',
  18850.75,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9ae137b861b343deb6cab60be6213e5c~mv2.png',
  'Tratamiento sindrome de hipocalcemia o hipomagnesemia, fiebre de la leche, tetanias, transportes prolongados, tetanias de los terneros, acetonemias - Para: Bovinos y Ovinos.',
  '500ml.',
  'Borogluconato de calcio 22,40 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.fatrovonfranken.com/Productos/Grandes-Animales_Mineralizantes/C-M-22',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Acuprin Richmond 500ml.',
  27880,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6b3f0e91d6ad45edb99db4f6c29a4776~mv2.png',
  'Suplemento nutricional corrector de desbalances dependientes de zinc y cobre - Gel de liberación gradual, corrección de desbalances dependientes de Zinc y Cobre. - Para: Bovinos y Ovinos.',
  '500ml.',
  'Etilendiaminotetracetato Cúprico Cálcico: 7,35 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=4&amp;id=25&amp;pg=1',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Receptal MSD 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_86f2c9b2a4224c2cb13910687e7ab315~mv2.png',
  'Hormona Gonadotrófica - Hormona liberadora (GnRH) de FSH y LH - Actúa sobre el lóbulo anterior de la hipófisis estimulando la secreción de las gonadotrofinas FSH y LH, que entran al torrente circulatorio periférico - La acción fisiológica de estas hormonas, es estimular la maduración de los folículos, desencadenar la ovulación y la posterior luteinización en el ovario con la formación del cuerpo lúteo - Para: Bovinos y Equinos.',
  '50ml.',
  'Buserelina, acetato: 0,42 mg.',
  '',
  ARRAY['bovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Oxiton Ovulos Agropharma 60u.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agropharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9b382ea29caa413fbdda721d5ea48270~mv2.png',
  'Antibiótico Quimioterápico con enzimas - Ovulos efervescentes - Prevención y tratamiento de los procesos infecciosos de las vías uterinas - Metritis - Endometritis - Retención de placenta - Abortos - Vaginitis - Piómetras - Para: Bovinos y Equinos.',
  '',
  'Cada 100 gr contiene:',
  '',
  ARRAY['bovino', 'equino'],
  'http://agropharma.net/producto/oxiton-ovulos-2/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Estrumate MSD 20ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bfeb7766374b4e34b4cd0cd543cb795f~mv2.png',
  'Prostaglandina sintética - Sincronización de celos, endometritis crónica purulenta, interrupción de preñez ( aborto o parto) - Para: Bovinos.',
  '20ml.',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Gestar Over 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f5403c33e375496094cb55d12986d046~mv2.png',
  'Solución lista para usar, que contiene la hormona liberadora de las gonadotrofinas, sintética, que estimula la liberación de FSH (Hormona folículo estimulante) y LH (Hormona luteinizante) - Para: Bovinos y Equinos.',
  '50ml.',
  '',
  '',
  ARRAY['bovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'CIDR Zoetis 10 Dispositivos Intravaginales.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5defedff6bab4c7b8a6022fe0a2f98b0~mv2.png',
  'Dispositivo de aplicación intravaginal a base de progesterona, indicado para la sincronización de servicios y tratamiento del anestro - Depósito de progesterona natural, la cual es liberada y absorbida por la mucosa vaginal, en cantidades suficientes para inhibir la liberación de las hormonas luteinizante (LH) y folículo estimulante (FSH) por la hipófisis frenando la ovulación y consecuente aparición del celo - Para: Bovinos.',
  '10 Dispositivos',
  '',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bioprost D 20ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biotay' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9ec83c3d21ad4bf69df5a1c43e9c9193~mv2_d_4896_3264_s_4_2.png',
  'Sincronización de celo, uso terapéutico en celos silentes, piómetras por retención de placenta, inducción de partos - Para: Bovinos, Equinos y Ovinos.',
  '20ml.',
  '',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Viral Querato CDV 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'CDV' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9e50068bd86c404e88a13b743cdf9a02~mv2.png',
  'Preventivo de cuadros respiratorios y oculares producidos por los virus IBR y BVD y Moraxella bovis - Para: Bovinos.',
  '250ml.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.cdv.com.ar/index.php/2015/07/vacuna-anti-viral-querato-doble-emulsion/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tilmicosina 30% Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d2a3e9a52648417db5e2c7a101d04e62~mv2.png',
  'Formulación antibiótica inyectable destinada al tratamiento de neumonía, queratoconjuntivitis y pietín en bovinos - Para: Bovinos.',
  '100ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/tilmicosina-30/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pinkeye sin esteroides 120ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_8f5b61106e5247369586d7107fa5cafe~mv2_d_4896_3264_s_4_2.png',
  'Antibiótico bactericida, viricida, antiséptico, anestésico y descongestivo - Su válvula dosificadora vaporiza un micronizado imperceptible para el animal - El agregado de EDTA produce lisis de los tejidos necrosados, para facilitar la acción de sus principios activos - Para: Bovinos.',
  '120ml.',
  'Gramicidina 0,0001 g.',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overtil Forte Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_097fe1f5140e4b5cbe609eea707bf608~mv2.png',
  'Antibiótico a base de tilmicosina con el agregado de meloxicam como agente antiinflamatorio - Doble acción antibiótica y antiinflamatoria con una sola dosis - Para el tratamiento de Neumonías, Queratoconjuntivitis y Pietín - Para: Bovinos.',
  '100ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/overtil-forte/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Gemicin Spray Over 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b15ae6236e5341ffacab2f6c3984db8d~mv2.png',
  'Antibiótico de amplio espectro destinado al tratamiento y control de infecciones locales provocadas por gérmenes sensibles a la Gentamicina - Para: Bovinos, Equinos y Ovinos.',
  '250ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/gemicin-spray/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'G1 plus Von Franken 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_92800adc344b4d8db6413059bb1d8bc5~mv2.png',
  'Coadyuvante en la prevención y tratamiento de la Queratoconjuntivitis bovina - Para: Bovinos.',
  '250ml.',
  'Aminoácidos, pool 53,7mg.',
  '',
  ARRAY['bovino'],
  'http://www.fatrovonfranken.com/Productos/Grandes-Animales_Queratoconjuntivitis/G-1-Plus',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'BTK 35 Konig 420ml.',
  14380,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_dab72c6974fb4ef99200eb5b11f70d23~mv2.png',
  'Tópico oftálmico - Curativo y preventivo de la queratoconjuntivitis - Bactericida, fungicida y viricida de acción total - Antiinflamatorio - Rápida desinfección y cicatrización de todo tipo de heridas y quemaduras - Tratamiento específico contra la queratoconjuntivitis - Para: Bovinos, Equinos y Ovinos.',
  '420ml.',
  'Cada 100 gramos de concentrado:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.koniglab.com/producto/btk-35/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bioqueratogen Oleo Max Biogenesis Bago 80 dosis 240ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_26923e640dfa40c5a09b172eaaa04fc2~mv2.png',
  'Vacuna para la prevención de la queratoconjuntivitis infecciosa bovina producida por la acción individual o combinada de Herpesvirus bovino, Moraxella bovis y Branhamella ovis - Para: Bovinos, Equinos y Ovinos.',
  '80 dosis 240',
  '',
  '',
  ARRAY['bovino'],
  'http://www.biogenesisbago.com/ar/productos/id2/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ineran Richmond 100ml.',
  11914,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_639a6bc8c1f445e8a4815f84f69d10ce~mv2.png',
  'Solución inyectable acuosa hormonal a base occitocina altamente purificada de uso obstétrico y ginecológico - Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Occitocina: 10 U.I.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=30&amp;id=31&amp;pg=1',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Estradiol Over 20ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_dfc7b000568240eb85c5a700043c7b03~mv2.png',
  'Solución oleosa de benzoato de estradiol indicada para el tratamiento de anestros, expulsión de placenta retenida, inducción al celo, tratamiento de falsa preñez - Para: Bovinos, Equinos y Ovinos.',
  '20ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/estradiol-multidosis/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Iverton L.A. 3.50 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agropharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b650532eed87495e9f8bbcc7e7e17d45~mv2.png',
  'Endectocida de Acción prolongada - Antisárnico - Garrapaticida - Melofagicida - Inyectable - Para: Bovinos y Ovinos.',
  '500ml.',
  'Ivermectina 3.5g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://agropharma.net/producto/iverton-l-a-3-50/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vermectin LA Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_c3e95519d2994803a33ca21d7c0a5b9a~mv2.png',
  'Endectocida inyectable de acción prolongada - Garrapaticida - Para el tratamiento y control de parasitosis internas y externas que afectan a los bovinos y ovinos - Para: Bovinos y ovinos .',
  '500ml.',
  'Ivermectina al 3.15%',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.over.com.ar/product/vermectin-la-premium/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ivomec Gold Boehringer 500ml.',
  70451,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_cf4e9a0fe125441ca4ce608b6d26696a~mv2.png',
  'Ivermectina al 3.15%, de acción prolongada, para el tratamiento y control de los parásitos internos y externos - Puede controlar los parásitos durante un año con dos tratamientos - Para: Bovinos.',
  '500ml.',
  'Ivermectina al 3.15%',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Dairy/Products/Pages/products_ivomecgold.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Flok Biogenesis Bago 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_5c87f07dea934cb287e843b3cfacded7~mv2.png',
  'Antiparasitario interno y externo altamente efectivo para el control y tratamiento de los parásitos gastrointestinales y pulmonares, sarna, miasis y garrapatas - Solución inyectable de Doramectina al 1,1% listo para usar - Para: Bovinos y Ovinos.',
  '500ml.',
  'Doramectina 1,1 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.biogenesisbago.com/ar/productos/id75/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dovertec Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_48a8d4b1ba0346d2aab3b9ef86862b25~mv2.png',
  'Solución comprobada para el problema de la miasis (bicheras) - Amplio espectro de acción contra parásitos internos y externos - Para: Bovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/dovertec/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dectomax Zoetis 500ml.',
  120628,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_d0ed14ef590347379f36cbf05578f872~mv2.png',
  'Endectocida inyectable de amplio espectro y larga persistencia - Parasiticida de amplio espectro y larga persistencia que actúa sobre los parásitos internos y externos de importancia económica - Posee además una indicación de ayuda al control de la Mosca de los Cuernos- Para: Bovinos y Ovinos.',
  '500ml.',
  'Doramectina: 1 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'https://ar.zoetis.com/products/bovinos/dectomax.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bagomectina Biogenesis Bago 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_389fadd1d38242a4ac35e766c576b6ca~mv2.png',
  'Antiparasitario interno y externo - combate los parásitos gastrointestinales, pulmonares, sarna, piojos, ura y miasis - Para: Bovinos y Ovinos.',
  '500ml.',
  'Ivermectina 1 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.biogenesisbago.com/ar/productos/id71/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ivomec Boehringer 1l.',
  89936,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8a0b5d1969404f4baca106b5f7b764d9~mv2.png',
  'Antiparasitario interno y externo - Control efectivo y prolongado de los parásitos gastrointestinales adultos y juveniles, pulmonares, ura, piojos y ácaros de la sarna - Para: Bovinos y Ovinos.',
  '1l.',
  'Ivermectina al 1%.',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Feedlot/Products/Pages/products_ivomec.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ivomec Boehringer 500ml.',
  51975,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_17f7bf16c8ac48668226bab2bc56e4d4~mv2.png',
  'Antiparasitario interno y externo - Control efectivo y prolongado de los parásitos gastrointestinales adultos y juveniles, pulmonares, ura, piojos y ácaros de la sarna - Para: Bovinos y Ovinos.',
  '500ml.',
  'Ivermectina al 1%.',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Feedlot/Products/Pages/products_ivomec.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ivomec F Boehringer 500ml.',
  158355,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9c0f7509aca84ac88dd143b968c85217~mv2.png',
  'Antiparasitario - Controla una amplia gama de parásitos gastrointestinales, trematodes hepáticos, ura, piojos y ácaros de la sarna - Para: Bovinos.',
  '500ml.',
  'Clorsulon al 1%.',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Dairy/Products/Pages/products_ivomec_f.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Meltra Brouwer 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Brouwer' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a520a80e319c40de9d065a19a8aca62a~mv2.png',
  'Antiparasitario externo e interno - Endectocida para tratamiento de parasitosis gastrointestinales, ura, miasis, piojos y acaros de la sarna - Para: Bovinos.',
  '1l.',
  'Ivermectina 1,0 g.',
  '',
  ARRAY['bovino'],
  'http://brouwer.com.ar/productos/meltra-endectocida/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cydectin Alfa Zoetis 500ml.',
  108570,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_63de065c1cda485aba71511d510b3579~mv2.png',
  'Solución antiparasitaria endectocida inyectable - Endectocida para tratamiento de parasitosis gastrointestinales, pulmonares, piojos y sarna - Para: Bovinos.',
  '500ml.',
  'Moxidectin: 1,05 g.',
  '',
  ARRAY['bovino'],
  'https://ar.zoetis.com/products/bovinos/cydectin-solucion-inyectable-al-1-para-ganado-ovino.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bovicine Richmond 500ml.',
  16894,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_89eea3bdd23c4997931875280898abe1~mv2.png',
  'Solución antiparasitaria endectocida inyectable - Es conocido por su potente acción parasiticida y amplio espectro, tanto contra los parásitos internos (Ascaris suum, Hiostrongylus rubidus, Strongylloides ransomi, Metastrongylus spp), como externos (sarna, piojos y otros ácaros e insectos) - Para: Bovinos.',
  '500ml.',
  'Ivermectina: 1 g.',
  '',
  ARRAY['bovino'],
  'http://www.richmondvet.com.ar/?seccion=productos&amp;sub=1&amp;cat=3&amp;id=16&amp;pg=1',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bagomectina AD3E Biogenesis Bago 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_688b902e92834e49b5d512edef8d5622~mv2.png',
  'Antiparasitario interno y externo para bovinos y ovinos - Garrapaticida bovino - Antisárnico ovino - Solución oleosa inyectable de Ivermectina 3.15% vitaminizada - Su acción antiparasitaria se complementa con una balanceada composición de tres vitaminas liposolubles indispensables para el crecimiento, desarrollo y reproducción del ganado - Para: Bovinos y Ovinos.',
  '500ml.',
  'Ivermectina 3.15 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.biogenesisbago.com/ar/productos/id73/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Synect Premium Over 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_990c806b34fe4ecf91398743764730c9~mv2.png',
  'Antiparasitario externo Pour-on - Formulación a base de Cipermetrina y Carbaril, con Butóxido de Piperonilo como sinergizante, en vehículo oleoso - Para: Bovinos, Equinos y Ovinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/synect-premium-pour-on/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Synect Premium Over 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f46d273e8aa1458591e4f920c6f69107~mv2.png',
  'Antiparasitario externo Pour-on - Formulación a base de Cipermetrina y Carbaril, con Butóxido de Piperonilo como sinergizante, en vehículo oleoso - Para: Bovinos, Equinos y Ovinos.',
  '1l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/synect-premium-pour-on/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Derramin Pour-on Brouwer 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Brouwer' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f87dae31892c440abdbe86540e131288~mv2.png',
  'Antiparasitario externo Pour-on - Antiparasitario externo de aplicación pour on, para el control de la mosca de los cuernos, piojos, ácaros y repelente de insectos - Es eficaz contra la mosca de los cuernos - Para: Bovinos, Equinos y Ovinos.',
  '5l.',
  'Cipermetrina 5,00 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://brouwer.com.ar/productos/derramin-nf-pour-on/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Mosktion Over 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_20d5ee0dc49541dc8ccfacacb0a13824~mv2.png',
  'Antiparasitario externo Pour-on - Indicado para el control y tratamiento de infestaciones producidas por H. Irritans (Mosca de los Cuernos), para moscas sensibles y resistentes a piretroides - Para: Bovinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/mos-k-tion-pf/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Mosktion Over 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_b703f095eca448b58147835a8100ed2c~mv2.png',
  'Antiparasitario externo Pour-on - Indicado para el control y tratamiento de infestaciones producidas por H. Irritans (Mosca de los Cuernos), para moscas sensibles y resistentes a piretroides - Para: Bovinos.',
  '1l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/mos-k-tion-pf/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ectoline Boehringer 5l.',
  264625.1,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_efdf4dc46e104e1fb37ba590db91065f~mv2.png',
  'Antiparasitario Pour-on - Control de la mosca de los cuernos, garrapata, ura, piojos masticadores, chupadores y bicheras - Alta eficacia contra cepas de mosca de los cuernos y garrapata resistentes a piretroides y fosforados - La nueva molécula (fipronil) que controla ectoparásitos mejor y por más tiempo - Menos estrés por menos movimientos y baños - Más ganancia de peso - Seguridad para el animal y para la persona que lo aplica - Para: Bovinos.',
  '5l.',
  'Fipronil al 1%.',
  '',
  ARRAY['bovino'],
  'http://www.merial.com.ar/Producers/Feedlot/Products/Pages/products_ectoline.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'OverZOL 10Co Over 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_df525a74b16647ba8aa2ab7c354d6443~mv2.png',
  'Antiparasitario interno de uso oral o intrarruminal en bovinos - Suspensión acuosa lista para usar de Albendazol al 10% con el agregado de Sulfato de cobalto - Para: Bovinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/albendazol-overzol-10-co/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Eleval con minerales Over 2.5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ed854c04465446a899a016e50febee88~mv2.png',
  'Antiparasitario interno para ovinos con minerales - Para: Ovinos.',
  '5l.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['ovino'],
  'http://www.over.com.ar/product/eleval-ovinos-con-minerales/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cyverm Intraruminal Zoetis 2.5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1a84509ac8874370a69043be2529af50~mv2_d_4896_3264_s_4_2.png',
  'Discontinuado. Antihelmintico intraruminal - Tratamiento y control de parásitos gastrointestinales y pulmonares - Para: Bovinos.',
  '5l.',
  'Fenbendazol 20%',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cyverm F-10 Zoetis 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_a98510e6ba17414cac71e5bf697cc2ce~mv2_d_4896_3264_s_4_2.png',
  'Discontinuado. Alternativa Bifetacel https://www.camponuevosrl.com/product-page/bifetacel-10-co-se-microsules-5l . Antiparasitario Oral - Antihelmintico oral - Tratamiento y control de parásitos gastrointestinales, pulmonares y de tenias - Para: Bovinos, Equinos y Ovinos.',
  '5l.',
  'Fenbendazol 10%',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://ar.zoetis.com/products/bovinos/cyverm-f-10.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Biofasiolex T10 Biogenesis Bago 2.5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biogenesis Bago' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e98334ba4c114424a4e0e461e57a19be~mv2.png',
  'Saguaypicida - Suspensión oral para bovinos - Tratamiento y control de fascioliasis hepática (Saguaypé) - Para: Bovinos.',
  '5l.',
  'Triclabendazol 10 g.',
  '',
  ARRAY['bovino'],
  'http://www.biogenesisbago.com/mx/productos/id228/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ricomax con minerales Over 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_17259c5bef93477d86c861128e36b97d~mv2.png',
  'Antiparasitario interno - Solución inyectable lista para usar de Ricobendazol al 15% con elementos minerales que previenen y corrigen su carencia, favoreciendo rápidamente la recuperación de los animales tratados - Contiene lidocaína para evitar el dolor en el sitio de inyección - Para: Bovinos.',
  '500ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/ricomax-con-minerales/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ricobendazol 15% Mivet 1lt.',
  46342.95,
  NULL,
  'https://static.wixstatic.com/media/06b954_33986a1af8b5485983406e5a69a0a71d~mv2.png',
  'Antiparasitario interno para bovinos de amplio espectro y triple acción - Para: Bovinos.',
  '1lt.',
  'Ricobendazole15,0 grs.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.laboratoriosmicrosules.com/producto/parasules-forte/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Levamic Fosfato Mivet 500ml.',
  29011.1,
  NULL,
  'https://static.wixstatic.com/media/06b954_9961055a72e646d7aed62bcac8534cec~mv2.png',
  'Antiparasitario interno - Para el tratamiento y control de nematodes gastrointestinales y pulmonares - Para: Bovinos y Ovinos.',
  '500ml.',
  'Levamisol fosfato 22,3 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.laboratoriosmicrosules.com/producto/levamic-fosfato/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Axilur PI Inyectable MSD 1l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_08a877c62ad94641821d6abbc8b70492~mv2.png',
  'Antiparasitario Interno con efecto vermicida, larvicida y ovicida en las Parasitosis Internas - Actúa con efecto vermicida, larvicida y ovicida en las parasitosis internas de los bovinos - Biodisponibilidad: El ricobendazol es el metabolito activo del albendazol - Cuando se administra albendazol a un animal, inmediatamente después de la absorción, es rápida y extensamente metabolizado a ricobendazol - Esta reacción llega al punto de equilibrio, que favorece al ricobendazol, por lo que normalmente pueden detectarse muy pequeñas cantidades de albendazol - La biodisponibilidad del ricobendazol es por lo expuesto mayor y más rápida que la del albendazol, si a esto le sumamos que el ricobendazol se administra en este caso por vía subcutánea, el efecto terapéutico será mucho más rápido - Excreción: La principal vía de eliminación es la orina - Durante las primeras 48 hs post administración se elimina cerca del 40% de la dosis. Una pequeña parte se elimina por materia fecal - El ricobendazol es metabolizado a la forma inactiva: 2 - amino - 2 - propilsulfonil - 1 - H - benzimidazole - Farmacodinamia: El principio activo logra su pico máximo de concentración en plasma y contenido abomasal entre las 8 y 18 horas post administración - El ricobendazol actúa sobre los parásitos mediante dos mecanismos de acción: a) inhibe la polimerización de la tubulina; b) inhibe el sistema enzimático fumarato-reductasa - Eliminación: A las 36 horas post administración no se detecta droga en la leche - 24 horas después de la inyección subcutánea no se detecta droga en el plasma sanguíneo - Para: Bovinos.',
  '1l.',
  'Ricobendazol (Albendazole, sulfoxido): 15 g.',
  '',
  ARRAY['bovino'],
  'http://www.msd-salud-animal.com.ar/products/112_141308/productdetails_112_141392.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Fort Dodge Spray Curabichera Zoetis 500ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_510b6e8721694e9c95633ff39539a160~mv2.png',
  'Matabicheras Fort Dodge es un moderno larvicida, repelente y cicatrizante, formulado a base de Vapona y Supona, dos productos insecticidas fosforados y Violeta de Genciana, quimioterapéutico y cicatrizante - Para: Bovinos, Equinos y Ovinos.',
  '500ml.',
  'Clorfenvinfos: 0,52 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://ar.zoetis.com/products/bovinos/matabichera-fd.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ectoline Spray Curabichera Boehringer 440ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_4313fb7ef72845438c613b472c89f4d9~mv2.png',
  'Producto spray, para uso externo (tópico), larvicida, cicatrizante y antimicrobiano indicado para la prevención y control de miasis o gusaneras causadas por larvas - Para: Bovinos.',
  '440ml.',
  'Cada 100 ml. corresponden a 128g concentrado:',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Bactrovet Plata AM Spray Curabichera Konig 440ml.',
  6490,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_eb4ca5928d654185b17379a49251daca~mv2.png',
  'Curabichera cicatrizante hemostático de alta adherencia - Cicatrizante, antimiásico, repelente, antimicrobiano, epitelizador y hemostático de alta adherencia de uso tópico - Para: Bovinos, Ovinos y Equinos.',
  '440ml.',
  'Cada 100 gramos de concentrado contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.koniglab.com/producto/bactrovet-plata-am/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Curabichera Pomada Cacique MSD 950gr.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_8d927faceaf943fda70427de033b85cc~mv2.png',
  'Antiparasitario externo - Pasta Curabicheras conteniendo Cipermetrina y Acido salicílico como ingredientes activos junto con otros agentes (inertes) de formulación, para ser aplicado directamente en la zona afectada del animal. - Para: Bovinos, Ovinos y Equinos.',
  '950g',
  'Cipermetrina 3,00 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.msd-salud-animal.com.ar/products/112_141324/productdetails_112_141440.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Curabicheras DKL5 Von Franken 1l.',
  24216.85,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Von Franken' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_45663d004bf84c75bf32d5565aadeb81~mv2.png',
  'Curabicheras líquido - Tratamiento y prevención de miasis, en todo tipo de heridas accidentales y quirúrgicas, descorne, señalada, marcación, descole, esquila, castración, y tratamiento del ombligo de los recién nacidos - Para: Bovinos.',
  '1l.',
  'D.D.V.P. 1,20 g.',
  '',
  ARRAY['bovino'],
  'http://www.fatrovonfranken.com/Productos/Grandes-Animales_Antiparasitarios-Externos/Dkl-5',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Curabicheras Coopers MSD 1lt.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_9d113041ee384759b04d147acf20afc0~mv2.png',
  'Curabicheras líquido - Larvicida externo. Antimiásico. Mata gusanos y protege contra la reinfestación - Para: Bovinos, Ovinos y Equinos.',
  '1lt.',
  'Cipermetrina: 0,3 g.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.msd-salud-animal.com.ar/products/curabichera-liquido/productdetails-curabichera-liquido.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Butox Garrapaticida MSD 5l.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_575014034a8b4c7fb0c8922af8e67c70~mv2.png',
  'Antiparasitario externo por inmersión - Garrapaticida, la deltametrina, es el único piretroide que en formulaciones comerciales presenta un solo isómero lo cual garantiza su efectividad absoluta, brindándole mayor potencia, residualidad, seguridad y amplio espectro de acción - Para: Bovinos.',
  '5l.',
  'Deltametrina: 3 g.',
  '',
  ARRAY['bovino'],
  'http://www.msd-salud-animal.com.ar/products/112_141321/productdetails_112_141431.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Terramicina LA Zoetis 500ml.',
  135608,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_3ebea63aeed34121b0f29784211eaed2~mv2.png',
  'Antibiótico inyectable de larga acción - Antibiótico de amplio espectro, eficaz contra bacterias, Mycoplasmas y protozoos de importancia en Medicina veterinaria - Para Bovinos y Ovinos.',
  '500ml.',
  'Oxitetraciclina: 20 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'https://ar.zoetis.com/products/bovinos/terramicina-la.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Terramicina Solución Zoetis 500ml.',
  62138,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f6335c11ed0e465d955888eda50738a1~mv2.png',
  'Solución de Clorhidrato de Oxitetraciclina en Propilenglicol - Antibiótico de amplio espectro, eficaz contra bacterias, Mycoplasmas y protozoos de importancia en Medicina veterinaria - Para Bovinos y Equinos.',
  '500ml.',
  'Oxitetraciclina: 5 g.',
  '',
  ARRAY['bovino', 'equino'],
  'https://ar.zoetis.com/products/terramicina_100_solucion_inyectable.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tetraciclina C InmunoVet 200 capsulas.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_4f0c2bc11616456f8492f9189333dd3a~mv2_d_4896_3264_s_4_2.png',
  'Antibiótico vitaminado de amplio espectro - Para: Bovinos y Equinos.',
  '',
  'Sulfametoxazol.',
  '',
  ARRAY['bovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Oversulf ADI Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f70a57ea51274fbc8ec73892585190c0~mv2.png',
  'Antibiótico bactericida y antidiarreico - Endovenosa para equinos y subcutánea o intramuscular para el resto de las especies. - Para: Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Trimetropina 2gr.',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/oversulf-adi/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overbiotic Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_abd04f30172e473497397181d506b8d1~mv2.png',
  'Overbiotic Antidiarreico Inyectable asocia en su fórmula un depresor de la motilidad intestinal (loperamida) y un antibiótico de amplio espectro (oxitetraciclina), lo que constituye una eficaz combinación para el tratamiento de diarreas por causas infecciosas en general - Aplicación subcutánea e intramuscular - Para: Bovinos.',
  '100ml.',
  'Loperamida Clorhidrato 0,04 %.',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/product/overbiotic-antidiarreico-inyectable/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Diafin N Konig frasco x 20ml.',
  9935.35,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Konig' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_31e83de5a2184b4b8f3cb4a8bb51f158~mv2.png',
  'Antibiótico y antidiarreico modulador de la motilidad intestinal e inyectable - Una sola aplicación pone fin a la diarrea - Elimina las enterobacterias patógenas - Para: Bovinos, Equinos, Porcinos y Ovinos.',
  '20ml.',
  'Cada 100 mL contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.koniglab.com/producto/diafin-n/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Vermectín B12 Over 1 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7d47da42bcae40b09cb9f44daf2b7444~mv2.png',
  'Antiparasitario interno de amplio espectro - Ivermectina al 1% con Vitamina B12 como factor antianémico - Para: Equinos.',
  '1 dosis.',
  'Cada 100 g contiene:',
  '',
  ARRAY['equino'],
  'http://www.over.com.ar/product/vermectin-b12-equinos/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Eqvalan Pasta Boehringer Jeringa 1 dosis.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6297b7e0b0dc47eca842660bc96b716d~mv2.png',
  'Antiparasitario interno-oral - Controla parásitos gastrointestinales, gastrófilos, pulmonares y cutáneos - Para: Equinos de cualquier edad, incluyendo yeguas preñadas y caballos reproductores.',
  '1 dosis.',
  'Ivermectina 1,87%',
  '',
  ARRAY['equino'],
  'http://www.merial.com.ar/Equine/Products/Pages/products_eqvalan.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Equiverm Richmond 3 Dosis.',
  9720,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Richmond' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_44456035dec64ce1a61e4225f3ee8feb~mv2.png',
  'Gel de administración oral - Antiparasitario endectocida de real amplio espectro contra gusanos chatos y redondos - Para Equinos.',
  '3 Dosis.',
  'Vermectina: 2 g.',
  '',
  ARRAY['equino'],
  'http://richmondvet.com.ar/?seccion=productos&amp;sub=4&amp;cat=17',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Planipart Boehringer Ingelheim 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_00c66bea647a42e1a47ce87dcd62f41e~mv2.png',
  'ALTERNATIVA: https://www.camponuevosrl.com/product-page/dila-t-vetue-100mlSolución Inyectable - Supresor de las contraciones uterinas, facilitando el parto - Para Bovinos, Equinos y Ovinos.',
  '50ml.',
  'Clenbuterol, clorhidrato 3 mg.',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Overbiotic DUO L.A. Over 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ba6f3d128e804e489aa8318924d75e28~mv2.png',
  'Antibiótico Antiinflamatorio Inyectable - Terapia combinada de antibiótico con antiinflamatorio para el tratamiento de enfermedades específicas o inespecíficas provocadas por gérmenes susceptibles a la oxitetraciclina - Para Bovinos y Ovinos.',
  '250ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.over.com.ar/product/overbiotic-duo/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ketofen 10% Boehringer 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f025152edcd940be85385b39dac24e65~mv2.png',
  'Solución Inyectable - Antiinflamatorio no esteroide, antiálgico y antipirético para tratamiento de afecciones respiratorias, músculo-esqueléticas, edemas mamarios, mastitis agudas, cólicos, artrosis, esparaván, enfermedad del navicular, tendinitis, bursitis, infosuras, miositis, inflamaciones post-quirúrgicas, tratamientos sintomáticos de los estados febriles - Para Bovinos y Equinos.',
  '50ml.',
  'Ketoprofeno 10%',
  '',
  ARRAY['bovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Flumeg Over 25ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_544a0e641cc24863ac9c49ea67c1fe12~mv2.png',
  'Solución Inyectable - Antiinflamatorio no esteroide y analgésico - Para Bovinos y Equinos.',
  '25ml.',
  'Flunixin meglumina 5%',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/flumeg/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Dexametasona Over 12 frascos x 10ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_6089c27809684cd9b35c933405a5556b~mv2.png',
  'Corticosteroide, Antialérgico y Antiflogístico. - Para bovinos, Equinos y Ovinos.',
  '10ml.',
  'Cada 100 ml contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'http://www.over.com.ar/product/dexametasona/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Banamine MSD 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_16d5ef8a6b184c54a6e4407bd7306c75~mv2.png',
  'Anitiinflamatorio no esteroide antipirético, antiendotóxico y analgésico - Para bovinos y Equinos.',
  '50ml.',
  'Meglumina de Flunixin 50 mg/ml.',
  '',
  ARRAY['bovino', 'equino'],
  'http://www.msd-salud-animal.com.ar/products/banamine/productdetails-banamine.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Tylan 200 Elanco 250ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_7ac029811198468da6ea5ce80456c813~mv2.png',
  'Antibiótico inyectable - Alcanza concentraciones en tejidos de 5 a 7 veces superiores a las que se obtienen en sangre - Trabaja en conjunto con el sistema inmunológico del animal, para problemas respiratorios, reproductivos y de patas - Atraviesa membranas lipídicas - Para Bovinos.',
  '250ml.',
  'Tilosina 200mg.',
  '',
  ARRAY['bovino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Terramicina LA Zoetis 250ml.',
  76426,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1aebca0e096946fab0f08a6899aa8d55~mv2.png',
  'Antibiótico inyectable de larga acción - Antibiótico de amplio espectro, eficaz contra bacterias, Mycoplasmas y protozoos de importancia en Medicina veterinaria - Para Bovinos y Ovinos.',
  '250ml.',
  'Oxitetraciclina: 20 g.',
  '',
  ARRAY['bovino', 'ovino'],
  'https://ar.zoetis.com/products/bovinos/terramicina-la.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Terramicina Solución Zoetis 250ml.',
  36166,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_53b57a593eab4290a235e180c8ae518c~mv2.png',
  'Solución de Clorhidrato de Oxitetraciclina en Propilenglicol - Antibiótico de amplio espectro, eficaz contra bacterias, Mycoplasmas y protozoos de importancia en Medicina veterinaria - Para Bovinos y Equinos.',
  '250ml.',
  'Oxitetraciclina: 5 g.',
  '',
  ARRAY['bovino', 'equino'],
  'https://ar.zoetis.com/products/terramicina_100_solucion_inyectable.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Taiker 200 Biotay 250ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Biotay' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e4de5ba60cc0483494aaf979c666c90d~mv2.png',
  'Antibiótico inyectable - Aplicado para el tratamiento de Mastitis agudas, Pietín, Endometritis, Neumonías, abscesos por Estaÿlococos y otras infecciones generadas por microorganismos sensibles a la tilosina - Para Bovinos.',
  '250ml.',
  'Tartrato de Tilosina al 20 %.',
  '',
  ARRAY['bovino'],
  'http://biotay.com/productos/taiker-200/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Raxidal MSD 50ml.',
  34232.45,
  (SELECT id FROM public.laboratorios WHERE nombre = 'MSD' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_ee3a596b122c4817aa149ba19bd70e29~mv2.png',
  'Es la asociación de 2 antibióticos complementarios y sinérgicos, la espiramicina y la estreptomicina, listo para preparar una solución inyectable en proporciones que le permiten alcanzar, a las dosis indicadas, altos niveles terapéuticos de ambos antibióticos - Actividad antibiótica: La espiramicina posee efectiva actividad bactericida y bacteriostática sobre gérmenes Gram positivos, Estreptococos, Estáfilococos, Enterococos, Neumococos, Clostridios, Corinebacterias, Erisipelotrix, etc, como así también sobre Micoplasmas (PPLO), Toxoplasmas, Leptospiras, Anaplasmas, Ricketsias, Amebas y ciertos Coccidios - La estreptomicina por su parte es particularmente activa contra microorganismos Gram negativos, Vibrios, Brucellas, Pasteurellas, Leptospiras, Colibacilos, Corinebacterias, Listeria monocitogenes y otros - Distribución en el organismo: Una vez administrado el Suanovil®, se difunde por todo el organismo (excepto S.N.C.) alcanzando en corto tiempo elevados niveles terapéuticos de ambos antibióticos en sangre y tejidos - La espiramicina en particular es fijada en forma selectiva y perdurable a nivel celular, lo que asegura una actividad prolongada a nivel del foco infeccioso - Las mayores concentraciones tisulares se alcanzan en pulmón, riñón, hígado, bazo, hueso y piel, tejidos en los que la concentración terapéutica es superior a casi todos los antibióticos - Es particularmente destacable la concentración alcanzada en tejidos glandulares que captan activamente la espiramicina incorporándola a su producto de secreción, tal es el caso de las glándulas mamarias, salivales y lagrimales - Asimismo se produce pasaje al tracto intestinal a través de las secreciones biliar y pancreática, realizando ciclo entero hepático - Es reducida, en cambio, la eliminación urinaria - Para: Bovinos y Equinos.',
  '50ml.',
  '',
  '',
  ARRAY['bovino'],
  'http://www.msd-salud-animal.com.ar/products/112_141379/productdetails_112_141623.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Pentabiotico Zoetis 24 Ampollas.',
  217656,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_3a5fe5934ece439cbe09d0ef9be11b15~mv2.png;06b954_bc2288c27d2441eeaab6c7e79292ee61~mv2.png',
  'Antibiótico inyectable - El producto logra niveles altos e inmediatos de penicilinas en suero - Con el agregado de Estreptomicina y Dihidroestreptomicina, se amplía el espectro de acción ya que actúan contra gérmenes gram negativos - Para Bovinos, Equinos y Ovinos.',
  '',
  'Penicilinas (benzatínica, potásica, procaínica): 400.000 U.I.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://ar.zoetis.com/products/pentabiotico-reforzado-24-fr.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Oxitetraciclina 20% LA Mivet 250ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_87d34d77ede14c489ace80e88fbe1654~mv2_d_4896_3264_s_4_2.png',
  'Antibiotico Inyectable de amplio espectro - Promover una acción prolongada y sostenida en el control y tratamiento de cuadros infecciosos causados por gérmenes, ciertos hongos patógenos o protozoarios - Para Bovinos y Ovinos.',
  '250ml.',
  'Cada ml contiene:',
  '',
  ARRAY['bovino', 'ovino'],
  'http://www.laboratoriosmicrosules.com/producto/oximic-20-la/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Micotil 300 Elanco 100ml.',
  0,
  NULL,
  'https://static.wixstatic.com/media/06b954_ee460d4b751b4347b29cc29691b7d719~mv2.png',
  'Antibiótico Inyectable - Solución Inyectable exclusivamente subcutánea en bovinos - Tratamiento sintomático y específico de afeciones broncopulmonares agudas causadas por agentes sensibles a la oxitetraciclina - Tratamiento de la Queratoconjuntivitis infecciosa bovina relacionada con sepas suceptibles de moraxella bovis - Para: Bovinos.',
  '100ml.',
  'Cada ml contiene:',
  '',
  ARRAY['bovino'],
  'https://www.viarural.com.ar/viarural.com.ar/insumosagropecuarios/ganaderos/laboratorio-vet/elanco/micotil-300.htm',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Genabil Boehringer Ingelheim 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Boehringer Ingelheim' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_85c29723f45c45f0bc3386739da5f6e4~mv2.png',
  'Antibiótico Inyectable - Estimulante de secreción de las glándulas digestivas superior, para el tratamiento de desequilibrios nutricionales - Hipersecretor Hepático, Gástrico y Pancreático - Para Bovinos, Equinos y Ovinos.',
  '100ml.',
  'Icteryl o ácido genabílico 100 mg.',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  '',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Penicilina Estreptomicina Over 6 Aplicaciones.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_e207d23265914018aa5173d954b5663b~mv2.png',
  'CONSULTAR PRECIO. Asociación antibiótica sinérgica de amplio espectro bactericida - Analgésico - Antitérmico - Solución Inyectable Intramuscular - Para Bovinos, Equinos y Ovinos.',
  '',
  'Cada frasco con polvo contiene:',
  '',
  ARRAY['bovino', 'ovino', 'equino'],
  'https://over.com.ar/product/penicilina-estreptomicina/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Draxxin Zoetis 50ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_f87dcce27edd412295f9ec953e17476b~mv2.png',
  'Antibiótico Inyectable en solución lista para usar en bovinos a base tulatromicina es un novedoso antibiótico - Para Bovinos.',
  '50ml.',
  'Tulatromicina 10 g.',
  '',
  ARRAY['bovino'],
  'https://ar.zoetis.com/products/bovinos/draxxin-bovino.aspx',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Cumetyl 300 Agropharma 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Agropharma' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bedf3d6e8e79496caa97883ae8debe5f~mv2_d_4896_3264_s_4_2.png',
  'Tratamiento de enfermedades respiratorias de los bovinos (ERB), especialmente las asociadas con Pasteurella haemolytica y multocida y otros microorganismos sensibles a la tilmicosina - Para Bovinos.',
  '100ml.',
  '',
  '',
  ARRAY['bovino'],
  'http://agropharma.net/producto/cumetyl-300/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Ceftiofur L.P.U. Over 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Over' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_7375d86ed8254423a68a28c321fd9783~mv2.png',
  'Antibiótico inyectable de amplio espectro (Ceftiofur al 5%) - Sin restricciones en leche - Para Bovinos.',
  '100ml.',
  'Ceftiofur 5g.',
  '',
  ARRAY['bovino'],
  'http://www.over.com.ar/en/product/ceftiofur-l-p-u/',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Baytril Max Bayer 100ml.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Bayer' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_bbbbacc3b6ae4117a9d127401b358cd8~mv2.png',
  'Antibacteriano de dosis única - Solución Inyectable - Para Bovinos.',
  '100ml.',
  'Enrofloxacina al 10%.',
  '',
  ARRAY['bovino'],
  'https://andina.bayer.com/es/productos/salud/animal-health/baytril-max-.php',
  true
);
INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  gen_random_uuid(),
  'Clavamox LC Zoetis 12 Jeringas 3gr.',
  0,
  (SELECT id FROM public.laboratorios WHERE nombre = 'Zoetis' LIMIT 1),
  'https://static.wixstatic.com/media/06b954_1885403879234fc0b6acbbf8b919f15d~mv2.png',
  'Combinación antibiótica y antiinflamatoria para uso intramamario para vacas en lactancia - Bactericida de amplio espectro, el cual actúa sobre patógenos productores de mastitis tales como Streptococcusss spp, Staphylococcus spp y otras especies sensibles a la Amoxicilina, incluyendo las especies productoras de Beta lactamasa - El ácido clavulánico neutraliza el mecanismo de defensa de las bacterias resistentes a los antibióticos Beta lactámicos, sensibilizando las bacterias a la acción de la Amoxicilina - Solución Inyectable - Para Bovinos.',
  '3g',
  'Amoxicilina trihidrato: 0,200 g.',
  '',
  ARRAY['bovino'],
  'https://ar.zoetis.com/products/bovinos/clavamox-lc.aspx',
  true
);
