import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_name: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category_name,
  }: RequestDTO): Promise<Transaction> {
    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Value of "type" field must be "income" or "outcome"');
    }

    const transactionRepository = getCustomRepository(TransactionRepository);
    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('Outcome register is greater than the total Balance');
    }

    const categoryRepository = getRepository(Category);

    let category = await categoryRepository.findOne({
      where: { title: category_name },
    });

    if (!category) {
      category = categoryRepository.create({
        title: category_name,
      });

      await categoryRepository.save(category);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: category.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
