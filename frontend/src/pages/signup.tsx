import { Button, Card, TextField, Typography } from "../components";

export default function Homepage() {
  return (
    <section className="h-auto">
      <div className="text-center ">
        <Typography>
          <h2 className="font-light text-huge p-12">Sign up for Micro</h2>
        </Typography>
        <form action="get">
          <div className="centered grid place-items-center">
            <Card className="grid gap-4 place-items-center rounded-lg p-16">
              <TextField
                label="Username..."
                placeholder="Username..."
                type="text"
                required={true}
              ></TextField>
              <TextField
                label="Email..."
                placeholder="Email..."
                type="email"
                required={true}
              ></TextField>
              <TextField
                label="Password..."
                placeholder="Password..."
                required={true}
                type="password"
              ></TextField>
              {/* TODO: ADD INFO BUTTON FOR ACCESS CODE FIELD */}
              <TextField
                label="Access code..."
                placeholder="Access code..."
                type="text"
                required={true}
              ></TextField>
              <hr />
              <Button colour="blue" text="Signup" />
            </Card>
            <Typography>
              <p>
                <a href="/login">Already have an account?</a>
              </p>
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}
