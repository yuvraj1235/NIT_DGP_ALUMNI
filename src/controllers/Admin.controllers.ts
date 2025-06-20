// controllers/admin.controller.ts
import { dbConnect } from "@/lib/dbConnect"
import { Admin } from '@/models/Admin.models';
import { comparePassword } from '@/utils/hash';
import { signToken } from '@/utils/jwt'; // ✅ Correct import

export async function loginAdmin(email: string, password: string) {
  await dbConnect();

  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error('Invalid email or password');

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) throw new Error('Invalid email or password');

  // ✅ Sign token (not verify)
  const token = signToken({
    id: admin._id,
    username: admin.username,
    role: 'admin'
  });

  return { token, admin };
}