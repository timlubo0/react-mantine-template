import {
    createStyles,
    Image,
    Container,
    Title,
    Text,
    Button,
    SimpleGrid,
    rem,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../navigation/routes';

interface Props{
    title: string;
    message: string;
    image?: string;
    redirectRoute?: string;
}

export function Error({ title, message, image, redirectRoute }: Props) {
    const { classes } = useStyles();

    const navigate = useNavigate();

    return (
      <Container className={classes.root}>
        <SimpleGrid
          spacing={80}
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
        >
          <Image
            src={image || "/assets/images/404-error.svg"}
            className={classes.mobileImage}
          />
          <div>
            <Title className={classes.title}>{ title }</Title>
            <Text color="dimmed" size="lg">
                { message }
            </Text>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
              onClick={() => navigate(redirectRoute || Routes.home)}
            >
              Get back to home page
            </Button>
          </div>
          <Image
            src={"/assets/images/404-error.svg"}
            className={classes.desktopImage}
          />
        </SimpleGrid>
      </Container>
    );
}

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    title: {
        fontWeight: 900,
        fontSize: rem(34),
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
        fontSize: rem(32),
        },
    },

    control: {
        [theme.fn.smallerThan('sm')]: {
        width: '100%',
        },
    },

    mobileImage: {
        [theme.fn.largerThan('sm')]: {
        display: 'none',
        },
    },

    desktopImage: {
        [theme.fn.smallerThan('sm')]: {
        display: 'none',
        },
    },
}));