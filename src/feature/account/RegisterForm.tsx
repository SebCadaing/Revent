import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import TextInput from "../../app/shared/components/TextInput";
import { handleError } from "../../lib/util/util";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
import CenteredCard from "../../app/shared/components/CenteredCard";
import { type RegisterSchema, registerSchema } from "../../lib/schema/registerSchema";
import { useFirestoreActions } from "../../lib/hooks/useFirestoreActions";
import { Timestamp } from "firebase/firestore";

export default function RegisterForm() {
  const { setDocument } = useFirestoreActions({ path: "profiles" });
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterSchema) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(result.user, {
        displayName: data.displayName,
      });
      await setDocument(result.user.uid, {
        displayName: data.displayName,
        email: data.email,
        createdAt: Timestamp.now(),
      });
      navigate("/events");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <CenteredCard icon={LockClosedIcon} title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
        <TextInput label="Display Name" name="displayName" control={control} />
        <TextInput label="Email Address" name="email" control={control} />
        <TextInput label="Password" name="password" control={control} type="password" />
        <button className="btn btn-primary w-full" disabled={!isValid || isSubmitting} type="submit">
          {isSubmitting && <span className="loading loading-spinner"></span>}
          Register
        </button>
      </form>
    </CenteredCard>
  );
}
