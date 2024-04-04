// @flow
import * as React from 'react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Box, Button, Container, Grid, IconButton, Stack, TextField, Typography} from "@mui/material";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import lottie, {AnimationItem} from 'lottie-web';
import AnimationTree from '../../animations/Animation-tree.json'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Veuillez entrer au moins 2 caractères')
        .max(50, 'Veuillez entrer au plus 50 caractères')
        .required('Ce champ est requis'),
    lastName: Yup.string()
        .min(2, 'Veuillez entrer au moins 2 caractères')
        .max(50, 'Veuillez entrer au plus 50 caractères')
        .required('Ce champ est requis'),
    password: Yup.string()
        .min(8, 'Veuillez entrer au moins 8 caractères')
        .required('Ce champ est requis'),
    email: Yup.string()
        .email('Veuillez entrer une adresse email valide')
        .required(),
});

const TOTAL_SEGMENT = 1200;
const INITIAL_SEGMENT = 300;
const SEGMENT_TO_ANIMATE = TOTAL_SEGMENT - INITIAL_SEGMENT;

export const RegisterPage = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            gender: '',
        },
        validateOnChange: true,
        validationSchema: SignupSchema,
        onSubmit: (values) => {

        },
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    type FieldType = keyof typeof formik.values;

    const fieldIsInvalid = (field: FieldType) => {
        return !Boolean(formik.errors[field]) && formik.values[field];
    }


    const formValidRatio = useMemo(() => {
        return ((Object.keys(formik.initialValues) as FieldType[]).filter(fieldIsInvalid).length
            / Object.keys(formik.initialValues).length)
    }, [formik.values, formik.errors]);


    const lottieRef = useRef<HTMLDivElement>(null);
    const lottieAnimRef = useRef<AnimationItem | null>(null);

    useEffect(() => {
        if (lottieRef.current ) {
            if (!lottieAnimRef.current) {
                lottieAnimRef.current = lottie.loadAnimation({
                    name: 'tree',
                    container: lottieRef.current, // the dom element that will contain the animation
                    renderer: 'svg',
                    loop: false,
                    // initialSegment: [0, INITIAL_SEGMENT],
                    autoplay: false,
                    animationData: AnimationTree
                });
                lottieAnimRef.current.playSegments([0, INITIAL_SEGMENT], true);
            } else {
                const end = SEGMENT_TO_ANIMATE * formValidRatio + INITIAL_SEGMENT;
                const start = lottieAnimRef.current.renderer.renderedFrame;
                console.log(lottieAnimRef.current, start, end);
                lottieAnimRef.current.playSegments([[start, end]], true);
            }
        }
    }, [formValidRatio]);


    return (
        <Grid container alignItems={'stretch'} sx={{
            height: '100vh',
            overflow: 'hidden',
        }}>
            <Grid item container alignItems={'flex-end'} justifyContent={'center'} xs={6} sx={{
                backgroundColor: 'rgba(220,244,44,0.1)',
                pb: 6,
            }}>
                <Box sx={{height: 800}} ref={lottieRef}/>
            </Grid>
            <Grid item xs={6} container alignItems={'center'}>
                <Container maxWidth={'sm'} sx={{pt: 3}}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant={'h4'} gutterBottom>
                                    Inscription
                                </Typography>
                                <Typography variant={'body1'} gutterBottom>
                                    Pour accéder à l'ensemble des fonctionnalités de l'application, veuillez vous
                                    inscrire.
                                </Typography>
                            </Box>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="Nom"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />

                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Prénom"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />

                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                InputProps={{
                                    endAdornment: <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                                        {passwordVisible ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                }}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button
                                disabled={!formik.isValid}
                                color="primary" variant="contained" fullWidth type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </form>

                </Container>
            </Grid>
        </Grid>
    );
};