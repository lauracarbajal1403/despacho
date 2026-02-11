"use client"
import React, { useEffect, useRef, useState } from 'react';

const AvisoPrivacidadNommy = () => {
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-100px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offset = 80;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          color: #000000;
          line-height: 1.7;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header */}
      <header className="text-center py-12 px-6">
        <h2 className="font-['Crimson_Pro'] text-3xl md:text-4xl font-bold text-[#274263] mb-2">
          Aviso de Privacidad Completo
        </h2>
        <p className="text-lg text-[#274263]">
          Para la Protección de Datos Personales
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-[900px] mx-auto px-6 py-8" style={{marginLeft: 'auto', marginRight: 'auto'}}>
        {/* Identidad y Domicilio */}
        <Section id="identidad" title="1. Identidad y Domicilio del Responsable" ref={sectionRefs}>
          <p className="mb-4 text-black text-justify">
            Según lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de Particulares, la responsable de recabar sus datos le informa sobre la política de privacidad y manejo de datos personales, la cual, en todo momento velará que el tratamiento de los mismos sea legítimo, controlado e informado, a efecto de garantizar la privacidad de los mismos.
          </p>

          <CompanyInfo />
        </Section>

        {/* Alcance */}
        <Section id="alcance" title="2. Alcance de este Aviso de Privacidad" ref={sectionRefs}>
          <p className="mb-4 text-black text-justify">
            La responsable es una persona moral, en pleno ejercicio de sus derechos y con todas las capacidades o facultades legales para brindar servicios y vincularse a todas sus obligaciones, incluidas las suscitadas en este instrumento.
          </p>

          <p className="mb-4 text-black text-justify">
            Este aviso de privacidad se aplica a todas las plataformas web, incluyendo los sitios web, dominios, servicios, plataformas web, aplicaciones y productos pertenecientes a la responsable y a sus subsidiarias de propiedad absoluta ("sitios o servicios de la responsable"), excepto que una política o declaración de privacidad específica para un producto o servicio de la responsable en particular pueda dejar sin efecto o complementar esta declaración o aviso de privacidad.
          </p>

          <HighlightBox>
            <p className="text-black text-justify">
              <strong>Medios de obtención de datos:</strong> El acceso y obtención de los datos personales puede llevarse a cabo por los siguientes medios: e-commerce, aplicación móvil, página web, cuentas en redes sociales, teléfono y/o cámaras de teléfonos móviles.
            </p>
          </HighlightBox>
        </Section>

        {/* Finalidad */}
        <Section id="finalidad" title="3. Finalidad del Tratamiento de los Datos" ref={sectionRefs}>
          <p className="mb-6 text-black text-justify">
            Los datos personales que proporcione tendrán las siguientes finalidades:
          </p>

          <h3 className="font-['Crimson_Pro'] text-2xl font-semibold text-black mb-4">
            Finalidades Principales
          </h3>
          
          <p className="mb-4 text-black text-justify">
            Para identificarle, ubicarle, comunicarle, contactarle, proveer servicio, dar seguimiento a las obligaciones contraídas, enviarle información y/o dar seguimiento a las relaciones comerciales, laborales y/o de cliente que motiven la transmisión de los relativos datos personales.
          </p>

          <div className="mb-6 text-black">
            <p className="mb-2 text-justify">La responsable puede recopilar información personal para completar distintas transacciones, por ejemplo:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li className="pl-2 text-justify"><strong>Gestión de la cuenta del Cliente B2B:</strong> Creación de perfiles y verificación de usuarios para el acceso a la plataforma.</li>
              <li className="pl-2 text-justify"><strong>Cumplimiento del Contrato:</strong> Realizar el cálculo, timbrado, dispersión y gestión de la nómina de los empleados de nuestros Clientes.</li>
              <li className="pl-2 text-justify"><strong>Obligaciones Laborales y Fiscales:</strong> Cumplimiento de obligaciones patronales ante el SAT, IMSS e INFONAVIT.</li>
              <li className="pl-2 text-justify"><strong>Gestión de Recursos Humanos:</strong> Administrar y automatizar incidencias de empleados.</li>
              <li className="pl-2 text-justify"><strong>Procesamiento de Pagos:</strong> Procesar pagos bancarios y emitir CFDI correspondiente.</li>
              <li className="pl-2 text-justify"><strong>Soporte Técnico:</strong> Atender solicitudes relacionadas con la operatividad de la plataforma.</li>
              <li className="pl-2 text-justify"><strong>Seguridad:</strong> Monitorear la actividad para evitar fraudes y amenazas.</li>
              <li className="pl-2 text-justify"><strong>Mejora de la Operatividad:</strong> Elaborar estudios y estadísticas internas.</li>
              <li className="pl-2 text-justify"><strong>Transferencia Indispensable:</strong> Compartir información con terceros necesarios para el servicio.</li>
              <li className="pl-2 text-justify"><strong>Aceptación Legal:</strong> Cumplimiento de obligaciones contractuales y legales.</li>
            </ul>
          </div>

          <h3 className="font-['Crimson_Pro'] text-2xl font-semibold text-black mt-8 mb-4">
            Finalidades Secundarias
          </h3>

          <p className="mb-4 text-black text-justify">Finalidades no necesarias, que permitirán brindar una mejor atención:</p>
          
          <ul className="mb-4 ml-6 list-disc text-black space-y-2">
            <li className="pl-2 text-justify">Brindarle información actualizada sobre nuevas funcionalidades, módulos o servicios.</li>
            <li className="pl-2 text-justify">Comunicación a través de boletines de noticias (newsletters) y correos electrónicos con contenido de valor.</li>
            <li className="pl-2 text-justify">Comunicación sobre ofertas, promociones personalizadas y servicios complementarios.</li>
            <li className="pl-2 text-justify">Seleccionar contenido y personalizar las interfaces de la aplicación.</li>
            <li className="pl-2 text-justify">Permitir participación en encuestas de calidad, estudios de opinión o concursos.</li>
            <li className="pl-2 text-justify">Investigaciones de mercado y prospección comercial.</li>
            <li className="pl-2 text-justify">Elaborar campañas publicitarias y programas de mercadotecnia.</li>
            <li className="pl-2 text-justify">Transferir datos de contacto a empresas filiales para fines de mercadotecnia.</li>
          </ul>

          <HighlightBox>
            <p className="text-black mb-2 text-justify">
              <strong>Derecho de Oposición:</strong> En caso de que no desee que sus datos personales sean tratados para estos fines, deberá manifestar su negativa a través del ejercicio de sus derechos ARCO o mediante el mecanismo de opt-out disponible en la configuración de su cuenta, dentro de los 5 días hábiles siguientes a la aceptación de este Aviso de Privacidad.
            </p>
            <p className="text-black text-justify">
              La negativa para el uso de sus datos personales para estas finalidades no podrá ser motivo para que la responsable le niegue los servicios o productos que contrata para las Finalidades Principales.
            </p>
          </HighlightBox>

          <h3 className="font-['Crimson_Pro'] text-2xl font-semibold text-black mt-8 mb-4">
            Finalidades Especiales
          </h3>

          <ul className="mb-4 ml-6 list-disc text-black">
            <li className="pl-2">Mercadotécnicos</li>
            <li className="pl-2">Publicitarios</li>
            <li className="pl-2">Prospección comercial</li>
          </ul>
        </Section>

        {/* Datos Sensibles */}
        <Section id="datos" title="4. Datos Personales Sensibles Tratados" ref={sectionRefs}>
          <p className="mb-6 text-black text-justify">
            Para las finalidades antes mencionadas, requerimos obtener los siguientes datos personales:
          </p>

          <DataTable />

          <HighlightBox className="mt-6">
            <p className="text-black text-justify">
              <strong>Consentimiento sobre Tratamiento de Datos Sensibles:</strong> El titular de los datos personales y sensibles otorga de manera libre e informada su consentimiento para que sus datos personales sensibles sean tratados conforme a lo señalado en el presente aviso de privacidad. Dicho consentimiento ha sido otorgado mediante la aceptación del titular a través de las acciones de click en las ventanas y botones desplegados para tal fin en el sitio web de la responsable.
            </p>
          </HighlightBox>
        </Section>

        {/* Transferencia */}
        <Section id="transferencia" title="5. Transferencia de Datos Personales" ref={sectionRefs}>
          <HighlightBox>
            <p className="text-black text-justify">
              <strong>Importante:</strong> Le informamos que sus datos personales NO serán transmitidos a persona física o moral alguna y serán tratados exclusivamente según lo que señala el presente aviso de privacidad.
            </p>
          </HighlightBox>

          <div className="mt-6">
            <h3 className="font-['Crimson_Pro'] text-xl font-semibold text-black mb-4">
              Consentimiento sobre Transferencia de Datos
            </h3>
            <p className="text-black text-justify">
              El titular de los datos personales otorga de manera libre e informada su consentimiento para que sus datos personales sensibles sean transferidos conforme a lo señalado en el presente aviso de privacidad. Dicho consentimiento ha sido otorgado mediante la aceptación del titular a través de las acciones de click en las ventanas y botones desplegados para tal fin en el sitio web de la responsable.
            </p>
          </div>
        </Section>

        {/* Derechos ARCO */}
        <Section id="arco" title="6. Ejercicio Derechos ARCO y Revocamiento" ref={sectionRefs}>
          <p className="mb-4 text-black text-justify">
            Usted tiene derecho a conocer qué datos personales tenemos registrados, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada conforme a los principios, deberes y obligaciones previstas en la normativa (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
          </p>

          <h3 className="font-['Crimson_Pro'] text-2xl font-semibold text-black mt-8 mb-4">
            Revocación del Consentimiento
          </h3>

          <p className="mb-4 text-black text-justify">
            Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal, queramos seguir tratando sus datos personales.
          </p>

          <h3 className="font-['Crimson_Pro'] text-2xl font-semibold text-black mt-8 mb-4">
            Medios de Contacto para Ejercer sus Derechos
          </h3>

          <ContactInfo />

          <h3 className="font-['Crimson_Pro'] text-2xl font-semibold text-black mt-8 mb-4">
            Requisitos para la Solicitud
          </h3>

          <p className="mb-4 text-black text-justify">Para el ejercicio de sus derechos ARCO, deberá integrar su petición con los siguientes requisitos:</p>

          <ol className="mb-4 ml-6 list-decimal text-black space-y-2">
            <li className="pl-2 text-justify">Petición firmada de su puño y letra, clara y concisa sobre los datos que desea modificar, ya sea en su versión impresa o digitalizada.</li>
            <li className="pl-2 text-justify">Copia de una identificación oficial, en versión impresa o digitalizada.</li>
            <li className="pl-2 text-justify">Para el caso de la solicitud a través de internet, llenar el formulario que le facilitamos para tal fin.</li>
          </ol>

          <h3 className="font-['Crimson_Pro'] text-2xl font-semibold text-black mt-8 mb-4">
            Limitación de Uso o Divulgación
          </h3>

          <p className="mb-4 text-black text-justify">
            Con objeto de que usted pueda limitar el uso y divulgación de su información personal, le ofrecemos los siguientes medios:
          </p>

          <HighlightBox>
            <p className="text-black text-justify">
              <strong>Registro Público para Evitar Publicidad:</strong> Su inscripción en el Registro Público para Evitar Publicidad, que está a cargo de la Procuraduría Federal del Consumidor (PROFECO), con la finalidad de que sus datos personales no sean utilizados para recibir publicidad o promociones de empresas de bienes o servicios.
            </p>
          </HighlightBox>
        </Section>

        {/* Cookies */}
        <Section id="cookies" title="7. Recopilación de Información a través de Medios Automáticos" ref={sectionRefs}>
          <p className="mb-4 text-black text-justify">
            Además de la información que nos proporcione, la responsable también podrá recabar información durante su visita a nuestro sitio web a través de registros en diversas redes sociales como Facebook, Google, Instagram o X y de sus herramientas de recopilación de datos automática, entre las que se incluyen:
          </p>

          <ul className="mb-6 ml-6 list-disc text-black space-y-2">
            <li className="pl-2">Formularios</li>
            <li className="pl-2">Balizas web</li>
            <li className="pl-2">Cookies</li>
            <li className="pl-2">Web beacons</li>
            <li className="pl-2">Google Analytics o Ads</li>
            <li className="pl-2">Cotizadores web</li>
            <li className="pl-2">Enlaces o aplicaciones web integradas</li>
          </ul>

          <HighlightBox>
            <p className="text-black mb-2 text-justify">
              <strong>Datos recopilados mediante tecnologías de rastreo:</strong>
            </p>
            <ul className="ml-6 list-disc text-black space-y-1">
              <li>Horario de navegación</li>
              <li>Tiempo de navegación en nuestra página de Internet</li>
              <li>Secciones consultadas</li>
              <li>Páginas de Internet accedidas previo a la nuestra</li>
              <li>Dirección de Protocolo de Internet (IP)</li>
              <li>Identificador único de dispositivo</li>
              <li>Tipo e idioma del navegador</li>
            </ul>
          </HighlightBox>

          <h3 className="font-['Crimson_Pro'] text-2xl font-semibold text-black mt-8 mb-4">
            Control de Cookies
          </h3>

          <p className="mb-4 text-black text-justify">
            Usted puede decidir si acepta o no las cookies. Una manera de hacerlo es a través de la configuración de su navegador de Internet. La mayoría de los navegadores permiten cierto control de cookies por medio de la configuración.
          </p>

          <CookieResources />
        </Section>

        {/* Modificaciones */}
        <Section id="modificaciones" title="8. Modificaciones al Presente Aviso de Privacidad" ref={sectionRefs}>
          <p className="mb-4 text-black text-justify">
            El responsable se reserva el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente Aviso de Privacidad, en atención a novedades legislativas o políticas internas.
          </p>

          <p className="mb-4 text-black text-justify">
            Sin embargo persiste el compromiso de mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, en caso de que esto suceda, será publicado en la propia página web del responsable o en su caso, se remitirá un correo electrónico con la información correspondiente.
          </p>
        </Section>

        {/* Control y Seguridad */}
        <Section id="seguridad" title="9. Control y Seguridad" ref={sectionRefs}>
          <p className="mb-4 text-black text-justify">
            La responsable se compromete a tomar las medidas necesarias para proteger la información recopilada, utilizando tecnologías de seguridad y procedimientos de control en el acceso, uso o divulgación de su información personal sin autorización.
          </p>

          <HighlightBox>
            <p className="text-black text-justify">
              <strong>Medidas de Seguridad:</strong> Almacenamos la información personal proporcionada en servidores ubicados en Centros de Datos que cuentan con controles de acceso limitado. Para solicitudes en línea, utilizamos tecnologías de seguridad que protegen la información personal transmitida a través de diversos medios electrónicos.
            </p>
          </HighlightBox>

          <p className="mt-6 text-black text-justify">
            De igual modo, la responsable, sus empleados, representantes, subcontratistas, consultores y/o los terceros que intervengan en cualquier fase del tratamiento de los Datos Personales deberán guardar confidencialidad respecto de éstos, obligación que subsistirá aún después de finalizar la relación entre la organización con el Titular.
          </p>
        </Section>

        {/* Aceptación */}
        <Section id="aceptacion" title="10. Aceptación e Información Adicional" ref={sectionRefs}>
          <HighlightBox>
            <p className="text-black mb-4 text-justify">
              <strong>Aceptación:</strong> Mediante la aceptación del presente Aviso de Privacidad usted, el titular, otorga su consentimiento para que sus datos personales, financieros y/o patrimoniales sean tratados conforme a lo señalado en el presente documento.
            </p>
          </HighlightBox>

          <p className="mt-6 text-black text-justify">
            Si usted considera que su derecho a la protección de sus datos personales ha sido lesionado por alguna conducta u omisión de nuestra parte, o presume alguna violación a las disposiciones previstas en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, su Reglamento y demás ordenamientos aplicables, podrá interponer su inconformidad o denuncia ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).
          </p>
        </Section>

        {/* Footer */}
        <footer className="mt-24 pt-12 pb-8 border-t border-gray-300 text-center text-black">
          <div className="font-['Crimson_Pro'] text-2xl font-bold text-black mb-4">
            Nommy
          </div>
          <p className="text-sm mb-2">
            © 2026 Nommy People & Payroll technologies. Todos los derechos reservados.
          </p>
          <p className="text-sm">
            Aviso de Privacidad - Última actualización: Febrero 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

// Section Component
const Section = React.forwardRef(({ id, title, children }, refs) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    refs.current[id] = sectionRef.current;
  }, [id, refs]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="mb-16"
    >
      <h2 className="font-['Crimson_Pro'] text-3xl md:text-4xl font-semibold text-black mb-6 text-center">
        {title}
      </h2>
      <div className="bg-white p-8">
        {children}
      </div>
    </section>
  );
});

// Highlight Box Component
const HighlightBox = ({ children, className = '' }) => (
  <div className={`bg-gray-100 border-l-4 border-black p-6 my-6 ${className}`}>
    {children}
  </div>
);

// Company Info Component
const CompanyInfo = () => {
  const info = [
    { label: 'Nombre o razón Social', value: 'NOMMY PEOPLE & PAYROLL TECHNOLOGIES S.A.P.I DE C.V' },
    { label: 'Nombre comercial', value: 'NOMMY' },
    { label: 'Domicilio', value: 'Av Aztlán 170, Cd del Sol, 45050 Zapopan, Jal.' },
    { label: 'Página web', value: 'https://nommy.mx', link: 'https://nommy.mx' },
    { label: 'Giro principal', value: 'Plataforma tecnológica B2B para la gestión, cálculo y timbrado automatizado de nómina y recursos humanos.' }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 my-6">
      {info.map((item, index) => (
        <div key={index} className="p-4 bg-gray-50 border border-gray-300">
          <div className="text-xs font-bold text-black uppercase mb-1">
            {item.label}
          </div>
          <div className="text-black">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline"
              >
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Data Table Component
const DataTable = () => {
  const employeeData = [
    { num: 1, name: 'Nombre completo', sensitive: false },
    { num: 2, name: 'Cargo del empleado', sensitive: false },
    { num: 3, name: 'Whatsapp corporativo', sensitive: false },
    { num: 4, name: 'Fecha de ingreso a la empresa', sensitive: false },
    { num: 5, name: 'Sueldo diario', sensitive: false },
    { num: 6, name: 'RFC', sensitive: false },
    { num: 7, name: 'NSS', sensitive: false },
    { num: 8, name: 'CURP', sensitive: false },
    { num: 9, name: 'Fecha de nacimiento', sensitive: false },
    { num: 10, name: 'Género', sensitive: false },
    { num: 11, name: 'Estado civil', sensitive: false },
    { num: 12, name: 'Correo electrónico', sensitive: false },
    { num: 13, name: 'Teléfono', sensitive: false },
    { num: 14, name: 'Dirección', sensitive: false },
    { num: 15, name: 'Cuenta de banco', sensitive: false },
    { num: 16, name: 'Banco', sensitive: false },
    { num: 17, name: 'Acceso a la ubicación', sensitive: false }
  ];

  const companyData = [
    { num: 18, name: 'Razón social', sensitive: false },
    { num: 19, name: 'Nombre comercial', sensitive: false },
    { num: 20, name: 'Fecha de alta', sensitive: false },
    { num: 21, name: 'RFC', sensitive: false },
    { num: 22, name: 'Actividad económica', sensitive: false },
    { num: 23, name: 'Banco', sensitive: false },
    { num: 24, name: 'Clabe', sensitive: false },
    { num: 25, name: 'Número de cuenta', sensitive: false },
    { num: 26, name: 'Constancia de situación fiscal', sensitive: false },
    { num: 27, name: 'Registro patronal', sensitive: false },
    { num: 28, name: 'Nombre y correo del representante legal', sensitive: false },
    { num: 29, name: 'Usuario y contraseña IDSE', sensitive: false },
    { num: 30, name: 'Certificado de sello digital', sensitive: false }
  ];

  return (
    <div className="space-y-8">
      {/* Employee Information */}
      <div>
        <h3 className="font-['Crimson_Pro'] text-xl font-semibold text-black mb-4">
          I. Información del empleado
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left border border-gray-400 text-black">#</th>
                <th className="p-3 text-left border border-gray-400 text-black">Denominación</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((item) => (
                <tr key={item.num}>
                  <td className="p-3 border border-gray-300 text-black">{item.num}</td>
                  <td className="p-3 border border-gray-300 text-black">{item.name}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <span className={`inline-block w-6 h-6 ${item.sensitive ? 'bg-black' : 'bg-gray-300'}`}></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company Information */}
      <div>
        <h3 className="font-['Crimson_Pro'] text-xl font-semibold text-black mb-4">
          II. Información de la empresa
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left border border-gray-400 text-black">#</th>
                <th className="p-3 text-left border border-gray-400 text-black">Denominación</th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((item) => (
                <tr key={item.num}>
                  <td className="p-3 border border-gray-300 text-black">{item.num}</td>
                  <td className="p-3 border border-gray-300 text-black">{item.name}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <span className={`inline-block w-6 h-6 ${item.sensitive ? 'bg-black' : 'bg-gray-300'}`}></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Contact Info Component
const ContactInfo = () => {
  const info = [
    { label: 'Correo electrónico', value: 'legal@nommy.mx', link: 'mailto:legal@nommy.mx' },
    { label: 'Por internet', value: 'https://nommy.mx', link: 'https://nommy.mx' },
    { label: 'Domicilio', value: 'Av Aztlán 170, Cd del Sol, 45050 Zapopan, Jal.' },
    { label: 'Días y horario de atención', value: 'Lunes a Viernes de 9:00hr a 18:00hrs' },
    { label: 'Teléfono', value: '(33) 15179175', link: 'tel:3315179175' },
    { label: 'Plazo máximo de respuesta', value: '2 horas' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {info.map((item, index) => (
        <div key={index} className="p-4 bg-gray-50 border border-gray-300">
          <div className="text-xs font-bold text-black uppercase mb-1">
            {item.label}
          </div>
          <div className="text-black">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline"
              >
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Cookie Resources Component
const CookieResources = () => {
  const browsers = [
    { name: 'Apple Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
    { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
    { name: 'Microsoft Internet Explorer', url: 'https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d' },
    { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer' }
  ];

  const resources = [
    { name: 'Google Analytics Opt-out', url: 'http://tools.google.com/dlpage/gaoptout' },
    { name: 'Adobe Flash Player', url: 'https://www.adobe.com/support/flashplayer/' },
    { name: 'Información sobre Cookies', url: 'https://www.allaboutcookies.org' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-black mb-3">Configuración de Cookies en Navegadores:</h4>
        <ul className="space-y-2">
          {browsers.map((browser, index) => (
            <li key={index} className="ml-6 list-disc text-black">
              <a href={browser.url} target="_blank" rel="noopener noreferrer" className="text-black underline">
                {browser.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-black mb-3">Recursos Adicionales:</h4>
        <ul className="space-y-2">
          {resources.map((resource, index) => (
            <li key={index} className="ml-6 list-disc text-black">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-black underline">
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvisoPrivacidadNommy;