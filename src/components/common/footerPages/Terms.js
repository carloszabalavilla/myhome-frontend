import React from "react";
import Footer from "../Footer";
import { Container, Typography, Box, TextField } from "@mui/material";

export const termsAndConditions = `
Términos y Condiciones

Fecha de entrada en vigor: 12 de mayo de 2024

1. Aceptación de los términos
Al acceder y utilizar nuestra aplicación, aceptas cumplir y estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, no utilices la aplicación.

2. Uso de la aplicación
- Edad mínima: Debes tener al menos 16 años para utilizar nuestra aplicación.
- Cuenta de usuario: Es tu responsabilidad mantener la confidencialidad de tu información de cuenta y contraseña.
- Comportamiento: Aceptas no usar la aplicación para actividades ilegales o no autorizadas. Te comprometes a no interferir con el funcionamiento de la aplicación o con el uso de la misma por parte de otros usuarios.

3. Privacidad
Nos comprometemos a proteger tu privacidad. Consulta nuestra Política de Privacidad para obtener más información sobre cómo recopilamos, usamos y protegemos tu información personal.

4. Propiedad intelectual
Todos los contenidos, incluidos pero no limitados a textos, gráficos, logotipos, y software, son propiedad de MyHome S.L. o sus licenciantes y están protegidos por leyes de propiedad intelectual. No puedes reproducir, distribuir, modificar o crear trabajos derivados sin nuestro permiso expreso.

5. Limitación de responsabilidad
La aplicación se proporciona "tal cual" y "según disponibilidad". No garantizamos que la aplicación estará libre de errores o ininterrumpida. En ningún caso seremos responsables por cualquier daño indirecto, incidental, especial, o consecuente que surja del uso o la incapacidad de usar la aplicación.

6. Modificaciones de los términos
Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en la aplicación. Es tu responsabilidad revisar estos términos periódicamente.

7. Terminación
Nos reservamos el derecho de suspender o terminar tu acceso a la aplicación en cualquier momento, sin previo aviso, por cualquier motivo, incluyendo pero no limitado a la violación de estos términos.

8. Ley aplicable
Estos términos se regirán e interpretarán de acuerdo con las leyes de España. Cualquier disputa que surja en relación con estos términos será resuelta exclusivamente en los tribunales de España.

9. Contacto
Si tienes alguna pregunta sobre estos términos, por favor contáctanos en myhomeappsupp@gmail.com.
`;

export default function TermsAndConditions() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ my: 4 }}
        >
          Términos y Condiciones
        </Typography>
        <Box>
          <TextField
            value={termsAndConditions}
            variant="outlined"
            fullWidth
            multiline
            rows={16}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
