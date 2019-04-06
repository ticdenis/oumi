import { AmountVO } from '@oumi-package/shared/lib/domain/amount.props';
import { UserId } from '@oumi-package/shared/lib/domain/user.props';

export interface ContactDebt {
  amount: AmountVO;
  id: UserId;
}
