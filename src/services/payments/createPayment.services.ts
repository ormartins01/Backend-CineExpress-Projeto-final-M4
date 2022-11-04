import { AppDataSource } from "../../data-source";
import { PaymentInfo } from "../../entities/paymentInfo.entities";
import { User } from "../../entities/user.entities";
import { IPaymentRequest } from "../../interfaces/payments";

const createPaymentServices = async (
  data: IPaymentRequest
): Promise<PaymentInfo> => {
  const { name, number, dueDate, code, userId } = data;

  const paymentRepository = AppDataSource.getRepository(PaymentInfo);
  const userRepository = AppDataSource.getRepository(User);

  const paymentInfo = paymentRepository.create({
    name,
    number,
    dueDate,
    code,
  });

  await paymentRepository.save(paymentInfo);

  await userRepository.update(
    { id: userId },
    {
      paymentInfo: paymentInfo,
    }
  );

  return paymentInfo;
};

export default createPaymentServices;
