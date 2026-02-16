import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { WeightsService } from './weights.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('weights') // <- важно! путь должен совпадать с POST запросом
export class WeightsController {
  constructor(private readonly weightsService: WeightsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addWeight(@Req() req, @Body() body: { date: string; weight: number }) {
    const userId = req.user.userId;
    return this.weightsService.addWeight(userId, body.date, body.weight);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWeights(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException('JWT invalid or missing');
    }
    const userId = req.user.userId;
    return this.weightsService.getUserWeights(userId);
  }
}
