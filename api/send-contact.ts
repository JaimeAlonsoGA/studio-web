import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY || '',
    process.env.MAILJET_SECRET_KEY || ''
);

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    service: string;
    message: string;
}

const SERVICE_LABELS: Record<string, string> = {
    'grabacion': 'Grabación',
    'edicion': 'Edición',
    'produccion': 'Producción',
    'mezcla': 'Mezcla',
    'mastering': 'Mastering',
    'clases-dj': 'Clases de DJ',
    'clases-produccion': 'Clases de Producción',
    'diseno-sonoro': 'Proyecto de Cortometraje',
    'musica-cortometraje': 'Proyecto de Videojuego',
    'podcast': 'Podcast',
    'varios': 'Varios Servicios',
    'otro': 'Otro',
};

// Email de agradecimiento al usuario con el estilo del estudio
function getUserThankYouEmail(name: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por contactar con El Boske</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #1e1b4b 0%, #0f0f23 50%, #1a1a2e 100%); min-height: 100vh;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <tr>
            <td>
                <!-- Header con gradiente -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.3) 0%, rgba(180, 83, 9, 0.2) 100%); border-radius: 24px 24px 0 0; padding: 40px 30px; border: 2px solid rgba(245, 158, 11, 0.3); border-bottom: none;">
                    <tr>
                        <td align="center">
                            <!-- Logo/Título -->
                            <h1 style="margin: 0; font-size: 42px; font-weight: bold; background: linear-gradient(90deg, #f59e0b, #d97706, #b45309); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                El Boske
                            </h1>
                            <p style="color: #fcd34d; font-size: 14px; letter-spacing: 3px; margin: 8px 0 0 0; text-transform: uppercase;">
                                Estudio de Grabación
                            </p>
                        </td>
                    </tr>
                </table>

                <!-- Contenido principal -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(180deg, rgba(30, 27, 75, 0.95) 0%, rgba(15, 15, 35, 0.98) 100%); padding: 40px 30px; border-left: 2px solid rgba(245, 158, 11, 0.3); border-right: 2px solid rgba(245, 158, 11, 0.3);">
                    <tr>
                        <td>
                            <h2 style="color: #fcd34d; font-size: 28px; margin: 0 0 20px 0; text-align: center;">
                                ¡Bienvenido, ${name}!
                            </h2>
                            
                            <p style="color: #e9d5ff; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0; text-align: center;">
                                Hemos recibido tu mensaje y estamos emocionados de saber más sobre tu proyecto musical.
                            </p>

                            <!-- Caja decorativa -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%); border-radius: 16px; padding: 25px; margin: 30px 0; border: 1px solid rgba(245, 158, 11, 0.2);">
                                <tr>
                                    <td align="center">
                                        <p style="color: #f5d0fe; font-size: 18px; font-style: italic; margin: 0; line-height: 1.6;">
                                            "Por aquí, por allá, creatividad sin parar,<br>
                                            en este estudio hay música... ¡y mucho más!"
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #c4b5fd; font-size: 16px; line-height: 1.8; margin: 0 0 15px 0;">
                                Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo en las próximas <strong style="color: #fcd34d;">24-48 horas</strong>.
                            </p>

                            <p style="color: #c4b5fd; font-size: 16px; line-height: 1.8; margin: 0;">
                                Mientras tanto, puedes explorar nuestros servicios y proyectos anteriores en nuestra web.
                            </p>
                        </td>
                    </tr>
                </table>

                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.2) 0%, rgba(180, 83, 9, 0.15) 100%); border-radius: 0 0 24px 24px; padding: 30px; border: 2px solid rgba(245, 158, 11, 0.3); border-top: none;">
                    <tr>
                        <td align="center">
                            <p style="color: #fcd34d; font-size: 14px; margin: 0 0 15px 0;">
                                ¡Nos vemos pronto en el estudio!
                            </p>
                            <p style="color: #a78bfa; font-size: 12px; margin: 0;">
                                El Boske · Estudio de Grabación<br>
                                <a href="mailto:musica@elboske.com" style="color: #f59e0b; text-decoration: none;">musica@elboske.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

// Email para el estudio con todos los datos del contacto
function getStudioNotificationEmail(data: ContactFormData): string {
    const serviceLabel = SERVICE_LABELS[data.service] || data.service;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo contacto desde la web</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a2e;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <tr>
            <td>
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 16px 16px 0 0; padding: 25px;">
                    <tr>
                        <td align="center">
                            <h1 style="margin: 0; color: #1a1a2e; font-size: 24px; font-weight: bold;">
                                📬 Nuevo Contacto desde la Web
                            </h1>
                        </td>
                    </tr>
                </table>

                <!-- Contenido -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #2d2d44; padding: 30px; border-left: 2px solid #f59e0b; border-right: 2px solid #f59e0b;">
                    <tr>
                        <td>
                            <!-- Info del contacto -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #404060;">
                                        <strong style="color: #fcd34d; display: inline-block; width: 120px;">Nombre:</strong>
                                        <span style="color: #e9d5ff;">${data.name}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #404060;">
                                        <strong style="color: #fcd34d; display: inline-block; width: 120px;">Email:</strong>
                                        <a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: none;">${data.email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #404060;">
                                        <strong style="color: #fcd34d; display: inline-block; width: 120px;">Teléfono:</strong>
                                        <span style="color: #e9d5ff;">${data.phone || 'No proporcionado'}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #404060;">
                                        <strong style="color: #fcd34d; display: inline-block; width: 120px;">Servicio:</strong>
                                        <span style="color: #34d399; font-weight: 600;">${serviceLabel}</span>
                                    </td>
                                </tr>
                            </table>

                            <!-- Mensaje -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a2e; border-radius: 12px; padding: 20px; border: 1px solid #404060;">
                                <tr>
                                    <td>
                                        <strong style="color: #fcd34d; display: block; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                            📝 Mensaje:
                                        </strong>
                                        <p style="color: #e9d5ff; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${data.message}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 0 0 16px 16px; padding: 20px;">
                    <tr>
                        <td align="center">
                            <p style="color: #1a1a2e; font-size: 13px; margin: 0;">
                                Recibido el ${new Date().toLocaleString('es-ES', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

export default async function handler(req: Request) {
    // Solo permitir POST
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Método no permitido' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const data: ContactFormData = await req.json();

        // Validación del servidor
        if (!data.name || !data.email || !data.service || !data.message) {
            return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return new Response(JSON.stringify({ error: 'Email inválido' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Enviar email de agradecimiento al usuario
        const userEmailPromise = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'noreply@elboske.com',
                        Name: 'El Boske',
                    },
                    To: [
                        {
                            Email: data.email,
                            Name: data.name,
                        },
                    ],
                    Subject: '¡Gracias por contactar con El Boske! 🎵',
                    HTMLPart: getUserThankYouEmail(data.name),
                },
            ],
        });

        // Enviar email de notificación al estudio
        const studioEmailPromise = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'noreply@elboske.com',
                        Name: 'Web El Boske',
                    },
                    To: [
                        {
                            Email: 'hola@elboske.com',
                            Name: 'El Boske Studio',
                        },
                    ],
                    ReplyTo: {
                        Email: data.email,
                        Name: data.name,
                    },
                    Subject: `🎵 Nuevo contacto: ${data.name} - ${SERVICE_LABELS[data.service] || data.service}`,
                    HTMLPart: getStudioNotificationEmail(data),
                },
            ],
        });

        // Enviar ambos emails en paralelo
        const [userResult, studioResult] = await Promise.all([userEmailPromise, studioEmailPromise]);

        // Verificar errores (Mailjet devuelve status en el body)
        const userBody = userResult.body as { Messages: Array<{ Status: string }> };
        const studioBody = studioResult.body as { Messages: Array<{ Status: string }> };
        
        if (userBody.Messages[0].Status === 'error' || studioBody.Messages[0].Status === 'error') {
            console.error('Error enviando emails:', { userResult, studioResult });
            return new Response(JSON.stringify({ error: 'Error al enviar los emails' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Emails enviados correctamente' 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error en el handler:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
